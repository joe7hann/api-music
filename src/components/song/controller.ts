import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

// Create a song
export const createSong = async (req: Request, res: Response): Promise<void> => {
    try {
        const data = req.body;

        const newSong = await prisma.song.create({ data });

        res.status(201).json({
            ok: true,
            message: `Song created successfully`,
            data: newSong
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error
        });
    }
};


// Show all songs (Non and user logged)
export const getAllSongs = async (req: Request, res: Response): Promise<void> => {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            const songsInPublic = await prisma.song.findMany({ where: { published: true } });
            res.status(200).json({
                ok: true,
                message: `Login to see private songs`,
                data: songsInPublic,
            });

        } else {
            const token = authorization.replace('Bearer ', '');
            const { id } = jwt.verify(token, process.env.JWT_SECRET);
            const user = await prisma.user.findUnique({ where: { id } })
            if(user){
                const songs = await prisma.song.findMany({});
                res.status(200).json({
                    ok: true,
                    data: songs,
                });
            } else{
                res.status(401).send({ error: `Token invalid or expired` });
            }
        }

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

