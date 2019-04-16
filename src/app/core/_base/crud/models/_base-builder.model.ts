export class BaseBuilderModel {
    // Basic
    id: number;
    name: string;
    description: string;
    // Edit
    isEditMode: boolean = false;
	// Log
	userId: number = 0;
	createdDate: string;
	updatedDate: string;
}
