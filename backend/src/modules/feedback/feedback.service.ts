import { addFeedbackRepo, checkProjectIdExist, getFeedbackCount, getFeedbackProjectWiseRepo } from "./feedback.repository";



export const addFeedbackService = async (username: string, email: string, feedback: string, projectId: string) => {
    const projectCheck = await checkProjectIdExist(projectId)

    if (!projectCheck.success) {
        return {
            success: false,
            message: "Project not found"
        };
    }

    const { max_feedback_per_project, current_feedback_count }: { max_feedback_per_project: number; current_feedback_count: number } = await getFeedbackCount(projectId);
    if (Number(max_feedback_per_project) <= current_feedback_count) {
        return {
            success: false,
            message: "Feedback submission limit reached. Please upgrade your plan."
        }
    }

    try {
        return await addFeedbackRepo(username, email, feedback, projectId);
    } catch (error: any) {
        throw error;
    }
}

export const getFeedbackProjectWiseService = async (projectId: string | string[]) => {
    try {
        const temp = await getFeedbackProjectWiseRepo(projectId);
        return temp;
    } catch (error: any) {
        throw error;
    }
}