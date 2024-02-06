"use server";
import mongoose from "mongoose";
import dbConnect from "./dbConnect";
import Users, { IUsers } from "@/models/Users";
import Scrapes from "@/models/Scrapes";
import Search from "@/models/Search";

type IsUserExist = (email: string) => Promise<boolean>;

export const isUserExist: IsUserExist = async (email: string) => {
  try {
    await dbConnect();

    const user = await Users.findOne({ email });

    if (!user) return false;
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

type User = {
  name: string;
  email: string;
  image: string;
};

type InsertUser = (user: User) => Promise<boolean>;

export const insertUser: InsertUser = async ({ email, image, name }) => {
  try {
    await dbConnect();

    await new Users<IUsers>({
      email,
      image,
      name,
    }).save();

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

type GetUserId = (email: string) => Promise<string>;

export const getUserId: GetUserId = async (email: string) => {
  const user = await Users.findOne({ email });
  return user._id;
};

type GetRelatedScrapes = (
  embedding: any,
  userId: mongoose.Types.ObjectId,
) => Promise<any[]>;

export const getRelatedScrapes: GetRelatedScrapes = async (
  embedding,
  userId,
) => {
  const pipelineStage: any[] = [
    {
      $vectorSearch: {
        index: "embed_index",
        path: "vectorize",
        queryVector: embedding,
        limit: 5,
        numCandidates: 200,
      },
    },
    {
      $match: { user: { $eq: userId } },
    },
    {
      $project: {
        text: 1,
        score: {
          $meta: "vectorSearchScore",
        },
      },
    },
  ];

  return await Scrapes.aggregate(pipelineStage);
};

type FullTextSearch = (
  ask: string,
  userId: mongoose.Types.ObjectId,
) => Promise<any[]>;

export const fullTextSearch: FullTextSearch = async (ask, userId) => {
  const pipelineStage: any[] = [
    {
      $search: {
        index: "fulltext_search",
        text: {
          query: ask,
          path: "ask",
        },
        scoreDetails: true,
      },
    },
    {
      $match: { user: { $eq: userId } },
    },
    {
      $project: {
        answer: 1,
        score: {
          $meta: "searchScoreDetails",
        },
      },
    },
  ];

  return await Search.aggregate(pipelineStage);
};
