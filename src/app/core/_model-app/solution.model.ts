import { BaseBuilderModel } from '../_base/crud/models/_base-builder.model';

export class SolutionModel extends BaseBuilderModel {
    roles: number[];
    image: string;

    clear(): void {
       // clear solution
    }
}
