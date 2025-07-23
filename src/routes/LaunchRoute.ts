import express from "express";
import { createDetailedIdea, createIdea, deleteSpecificIdea, getSpecificDetail, getSpecificIdeaAnswers, getSpecificsummarizedIdea, launchDetailedIdea, launchIdeaWithAnswers, launchIdeaWithIdeaNAnswers } from "../controllers/LaunchController";
import { createDetailedIdeaValidation, createIdeaValidation, launchDetailedIdeaValidation, launchWithAnswersValidation, launchWithIdeaNAnswersValidation, validateIdeaIdQuery } from "../validations/LaunchValidation";

export const launch_route = express.Router();

launch_route.post("/generate-idea-with-answers", launchWithAnswersValidation(), launchIdeaWithAnswers);

launch_route.post("/generate-idea-with-answers-n-base-idea", launchWithIdeaNAnswersValidation(), launchIdeaWithIdeaNAnswers);

launch_route.post("/generate-detailed-idea", launchDetailedIdeaValidation(), launchDetailedIdea);

launch_route.post("/create/idea", createIdeaValidation(), createIdea);

launch_route.post("/create/detailed/idea", createDetailedIdeaValidation(), createDetailedIdea);

launch_route.get("/get/specific/summarized/idea", validateIdeaIdQuery(), getSpecificsummarizedIdea);

launch_route.get("/get/specific/idea/answers", validateIdeaIdQuery(), getSpecificIdeaAnswers);

launch_route.get("/get/detail", validateIdeaIdQuery(), getSpecificDetail);

launch_route.delete("/delete/specific/idea", validateIdeaIdQuery(), deleteSpecificIdea);