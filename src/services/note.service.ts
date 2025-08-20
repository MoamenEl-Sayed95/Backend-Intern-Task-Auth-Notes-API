import Note, { INote } from '../models/note.model'

export const createNote = async (data: Partial<INote>) => {
    return await new Note(data).save()
};

export const getAllNotes = async (userId: string, role: string, search?: string, page = 1, limit = 10) => {
    const filter: any = { isDeleted: false }
    if (role !== 'admin') filter.userId = userId
    if (search) filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
    ]
    return await Note.find(filter)
        .skip((page - 1) * limit)
        .limit(limit)
};;

export const getNoteById = async (id: string, userId: string, role: string) => {
    const filter: any = { _id: id, isDeleted: false }
    if (role !== 'admin') filter.userId = userId
    return await Note.findOne(filter)
};

export const updateNote = async (id: string, data: Partial<INote>, userId: string, role: string) => {
    const filter: any = { _id: id, isDeleted: false }
    if (role !== 'admin') filter.userId = userId
    return await Note.findOneAndUpdate(filter, data, { new: true })
};

export const deleteNote = async (id: string, userId: string, role: string) => {
    const filter: any = { _id: id }
    if (role !== 'admin') filter.userId = userId
    return await Note.findOneAndUpdate(filter, { isDeleted: true }, { new: true })
};