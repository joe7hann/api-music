import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create a playlist
export const createPlaylist = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, author } = req.body;
        const newPlaylist = await prisma.playlist.create({
            data: {
                name,
                author: { connect: { id: author } },
                songs: { create: [] }
            },
        });

        res.status(201).json({
            ok: true,
            message: `Playlist "${newPlaylist.name}" created successfully`,
            data: newPlaylist
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error
        });
    }
};

// Add Songs to Playlist
export const addSongToPlaylist = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id_song, id_playlist } = req.body;

        const song = await prisma.song.findUnique({ where: { id: id_song } });
        const playlist = await prisma.playlist.findUnique({ where: { id: id_playlist } });

        if (!song) {
            return res.status(404).json({
                ok: false,
                error: `Song doesn't exist`
            });
        }
        if (!playlist) {
            return res.status(404).json({
                ok: false,
                error: `Playlist doesn't exist`
            });
        }

        const addingSongToPlaylist = await prisma.playlist.update({
            data: {
                songs: {
                    connect: { id: song.id }
                }
            },
            where: {
                id: playlist.id
            }
        });

        res.status(201).json({
            ok: true,
            message: `Song added to playlist successfully`,
            data: addingSongToPlaylist
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error
        });
    }
};



// Show a playlist by ID
export const getPlaylistById = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = Number(req.params.id);

        const playlist = await prisma.playlist.findUnique({ where: { id: id }, include:{ songs: true },});

        res.status(200).json({
            ok: true,
            data: playlist,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error
        });
    }
};
