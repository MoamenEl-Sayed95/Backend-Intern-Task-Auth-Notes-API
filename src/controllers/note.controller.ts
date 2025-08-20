import { Request, Response, NextFunction } from 'express';
import * as noteService from '../services/note.service';


interface AuthRequest extends Request {
  user?: { id: string; role: string }
};

export const create = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' })
    const note = await noteService.createNote({ ...req.body, userId: req.user.id })
    res.status(201).json(note)
  } catch (err) {
    next(err)
  }
};


export const getAll = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    // Check if user is authenticated
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' })
    
    // Destructure query parameters with default values
    const { search, page = '1', limit = '10' } = req.query

    // Convert page and limit to numbers, default to 1 and 10 if invalid
    const pageNumber = Number(page) || 1
    const limitNumber = Number(limit) || 10

    // Fetch notes from the service with role-based filtering, search, and pagination
    const notes = await noteService.getAllNotes(
      req.user.id,
      req.user.role,
      search as string,
      pageNumber,
      limitNumber
    )

    // Send the fetched notes as JSON response
    res.json(notes)
  } catch (err) {

    // Pass any errors to the error handling middleware
    next(err)
  }
};

export const getById = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' })

    const note = await noteService.getNoteById(req.params.id, req.user.id, req.user.role)
    if (!note) return res.status(404).json({ message: 'Note not found' })
    res.json(note)
  } catch (err) {
    next(err)
  }
};

export const update = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' })

    const note = await noteService.updateNote(req.params.id, req.body, req.user.id, req.user.role)
    if (!note) return res.status(404).json({ message: 'Note not found' })
    res.json(note)
  } catch (err) {
    next(err)
  }
};

export const remove = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' })

    const note = await noteService.deleteNote(req.params.id, req.user.id, req.user.role)
    if (!note) return res.status(404).json({ message: 'Note not found' })
    res.status(204).send()
  } catch (err) {
    next(err)
  }
};