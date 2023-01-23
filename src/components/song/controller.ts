import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create a song
export const createSong = async (req: Request, res: Response): Promise<void> => {
    try {
        const data = req.body;

        const newSong = await prisma.song.create({ data });

        res.status(201).json({
            ok: true,
            message: "Song created successfully",
            data: newSong
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error
        });
    }
};


// Show all songs
export const getAllSongs = async (_req: Request, res: Response): Promise<void> => {
    try {
        
        const songs = await prisma.song.findMany({});

        res.status(200).json({
            ok: true,
            data: songs,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error
        });
    }
};

// Show a song by ID
export const getSongById = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = Number(req.params.id);

        const song = await prisma.song.findUnique({ where:{ id : id}});

        res.status(200).json({
            ok: true,
            data: song,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error
        });
    }
};

