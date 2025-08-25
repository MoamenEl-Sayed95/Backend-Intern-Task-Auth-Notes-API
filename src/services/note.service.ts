import Note, { INote } from '../models/note.model';

export const createNote = async (data: Partial<INote>) => {
    return await new Note(data).save();
};

export const getAllNotes = async (
    userId: string,
    role: string,
    search?: string,
    page = 1,
    limit = 10,
    sortBy = 'createdAt',
    order: 'asc' | 'desc' = 'desc',
    tags?: string[],
    includeDeleted = false
) => {
    const filter: any = {}
    if (!includeDeleted) filter.isDeleted = false
    if (role !== 'admin') filter.userId = userId
    if (search) filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
    ]
    if (tags) filter.tags = { $all: tags }

    return await Note.find(filter)
        .sort({ [sortBy]: order === 'desc' ? -1 : 1 })
        .skip((page - 1) * limit)
        .limit(limit)
};

export const getNoteById = async (id: string, userId: string, role: string) => {
    const filter: any = { _id: id, isDeleted: false };
    if (role !== 'admin') filter.userId = userId
    return await Note.findOne(filter);
};

export const updateNote = async (id: string, data: Partial<INote>, userId: string, role: string) => {
    const filter: any = { _id: id, isDeleted: false }
    if (role !== 'admin') filter.userId = userId
    return await Note.findOneAndUpdate(filter, data, { new: true });
};

export const deleteNote = async (id: string, userId: string, role: string) => {
    const filter: any = { _id: id }
    if (role !== 'admin') filter.userId = userId
    return await Note.findOneAndUpdate(filter, { isDeleted: true }, { new: true });
};

export const getNotesStats = async (userId: string, role: string) => {
  const match: any = {}
  if (role !== 'admin') match.userId = userId

  const total = await Note.countDocuments(match)
  const deleted = await Note.countDocuments({ ...match, isDeleted: true })
  const byTagAgg = await Note.aggregate([
    { $match: match },
    { $unwind: '$tags' },
    { $group: { _id: '$tags', count: { $sum: 1 } } }
  ])

  const byTag: Record<string, number> = {}
  byTagAgg.forEach(t => byTag[t._id] = t.count)

  return { total, deleted, byTag }
};

export const getAllTags = async (userId: string, role: string) => {
  const filter: any = {}
  if (role !== 'admin') filter.userId = userId
  return await Note.distinct('tags', filter)
};