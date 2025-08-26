// this data is just demo data
// need to redesign it

import { Request, Response } from "express";
import Content from "../models/ContentModel";
import { IUser } from "../types";

export const getContent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { section, subsection } = req.query;

    const query: any = { isActive: true };

    if (section) {
      query.section = section;
    }

    if (subsection) {
      query.subsection = subsection;
    }

    const content = await Content.find(query)
      .sort({ createdAt: -1 })
      .populate("updatedBy", "personalInfo.fullName email");

    res.status(200).json({
      success: true,
      message: "Content retrieved successfully",
      data: { content },
    });
  } catch (error: any) {
    console.error("Get content error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve content",
      error: error.message,
    });
  }
};

export const createContent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { section, subsection, type, content, isActive = true } = req.body;
    const user = req.user as IUser;

    const newContent = new Content({
      section,
      subsection,
      type,
      content,
      isActive,
      updatedBy: user._id,
      version: 1,
    });

    await newContent.save();

    const populatedContent = await Content.findById(newContent._id).populate(
      "updatedBy",
      "personalInfo.fullName email"
    );

    res.status(201).json({
      success: true,
      message: "Content created successfully",
      data: { content: populatedContent },
    });
  } catch (error: any) {
    console.error("Create content error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create content",
      error: error.message,
    });
  }
};

export const updateContent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { contentId } = req.params;
    const { section, subsection, type, content, isActive } = req.body;

    const user = req.user as IUser;
    const updatedContent = await Content.findByIdAndUpdate(
      contentId,
      {
        ...(section && { section }),
        ...(subsection && { subsection }),
        ...(type && { type }),
        ...(content && { content }),
        ...(isActive !== undefined && { isActive }),
        updatedBy: user._id,
      },
      { new: true, runValidators: true }
    ).populate("updatedBy", "personalInfo.fullName email");

    if (!updatedContent) {
      res.status(404).json({
        success: false,
        message: "Content not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Content updated successfully",
      data: { content: updatedContent },
    });
  } catch (error: any) {
    console.error("Update content error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update content",
      error: error.message,
    });
  }
};

export const deleteContent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { contentId } = req.params;

    const deletedContent = await Content.findByIdAndDelete(contentId);

    if (!deletedContent) {
      res.status(404).json({
        success: false,
        message: "Content not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Content deleted successfully",
    });
  } catch (error: any) {
    console.error("Delete content error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete content",
      error: error.message,
    });
  }
};

export const getAllContent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { page = 1, limit = 20 } = req.query;

    const skip = (Number(page) - 1) * Number(limit);

    const content = await Content.find()
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .populate("updatedBy", "personalInfo.fullName email");

    const total = await Content.countDocuments();

    res.status(200).json({
      success: true,
      message: "All content retrieved successfully",
      data: {
        content,
        pagination: {
          current: Number(page),
          total: Math.ceil(total / Number(limit)),
          count: content.length,
          totalContent: total,
        },
      },
    });
  } catch (error: any) {
    console.error("Get all content error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve content",
      error: error.message,
    });
  }
};
