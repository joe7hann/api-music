import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

async function hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
}

// Create a user
export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const {name, email } = req.body;
        const password = req.body.password;
        const hashedPassword = await hashPassword(password);

        const newUser = await prisma.user.create({ data: {
            name: name,
            email: email,
            password : hashedPassword,
        }, });

        res.status(201).json({
            ok: true,
            message: `User created successfully`,
            data: newUser
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error
        });
    }
};



// Login for User
export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body
        const user = await prisma.user.findUnique({ where: { email } })

        if (!user) {
            res.status(400).send({ error: `Invalid email or password` })
        } else {
            const isMatch = await bcrypt.compare(password, user.password)
            
            if (!isMatch) {
            res.status(400).send({ error: `Invalid email or password` })
            } else {
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET  )
            
            res.status(201).json({
            ok: true,
            message: `Logged successfully`,
            Token: token
            });

            }
        }
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error
        });
    }
}
