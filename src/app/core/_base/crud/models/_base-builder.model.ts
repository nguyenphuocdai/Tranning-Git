export class BaseBuilderModel {
    // Basic
    _id: number;
    _name: string;
    _description: string;
    // Edit
    _isEditMode: boolean = false;
	// Log
	_userId: number = 0;
	_createdDate: string;
	_updatedDate: string;
}
