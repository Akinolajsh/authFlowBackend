import express, { Request, Response } from "express";
import { HTTP, mainError } from "../Error/mainError";
import authFlowModel from "../model/authFlowModel";
import bcrypt from "bcrypt";
import cloudinary from "../config/cloudinary";

export const authRegister = async (
  req: any,
  res: Response
): Promise<Response> => {
  try {
    const { firstName, lastName, email, password, avatar, avatarID } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      req.file?.path
    );

    const register = await authFlowModel.create({
      firstName,
      lastName,
      email,
      password: hashed,
      avatar: secure_url,
      avatarID: public_id,
    });
    return res.status(HTTP.CREATED).json({
      message: "Registration successfully created",
      data: register,
    });
  } catch (error) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: error.message,
    });
  }
};

export const authSignIn = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { password, email } = req.body;
    const user = await authFlowModel.findOne({ email });

    if (user) {
      const checked = await bcrypt.compare(password, user.password!);

      if (checked) {
        return res.status(HTTP.CREATED).json({
          message: `welcome back ${user.firstName}`,
          data: user._id,
        });
      } else {
        new mainError({
          name: "Signin Error",
          message: "This password is not correct. Please try again",
          status: HTTP.BAD_REQUEST,
          success: false,
        });
        return res.status(HTTP.BAD_REQUEST).json({
          message: "Incorrect password. Please try again",
        });
      }
    } else {
      new mainError({
        name: "Signin Error",
        message: "This user cannot be found",
        status: HTTP.BAD_REQUEST,
        success: false,
      });
    }

    return res.status(HTTP.BAD_REQUEST).json({
      message: "Error",
    });
  } catch (error) {
    new mainError({
      name: "create Error",
      message: "This error occurred as a result of the user creation",
      status: HTTP.BAD_REQUEST,
      success: false,
    });
    return res.status(HTTP.BAD_REQUEST).json({
      message: "Error creating",
    });
  }
};


export const getUser = async (req: any, res: Response): Promise<Response> => {
  try {
    const user = await authFlowModel.find();
    return res.status(HTTP.OK).json({
      message: "All users found successfully",
      data: user,
    });
  } catch (error) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: error.message,
    });
  }
};

export const getOneUser = async (
  req: any,
  res: Response
): Promise<Response> => {
  try {
    const { authID } = req.params;
    const user = await authFlowModel.findById(authID);
    return res.status(HTTP.OK).json({
      message: "User found successfully",
      data: user,
    });
  } catch (error) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: error.message,
    });
  }
};
