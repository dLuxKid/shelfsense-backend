import type { Request, Response } from "express";
import { UserModel } from "../models/users";
import { encrpytPassword, random } from "../utils";

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username)
      return res.status(400).send({ error: "incomplete credentials" });

    const salt = random();
    const user = await UserModel.create({
      email,
      username,
      authentication: { salt, password: encrpytPassword(salt, password) },
    });

    res.status(201).json({ status: "success", data: user });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: "failure", error });
  }
};
