// Author: T4professor

import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
    selector: 'app-button-renderer',
    template: `
    <i nz-icon nzType="edit" nzTheme="outline" *ngIf="(label=='Edit')" nz-tooltip nzTooltipTitle="Edit" (click)="onClick($event)"></i>
    <i nz-icon nzType="delete" nzTheme="outline" *ngIf="(label=='Delete')" nz-tooltip nzTooltipTitle="Delete" (click)="onClick($event)"></i>
    <i nz-icon nzType="user" nzTheme="outline" *ngIf="(label=='Patient')" nz-tooltip nzTooltipTitle="Patient's History" (click)="onClick($event)"></i>
    `
})

export class ButtonRendererComponent implements ICellRendererAngularComp {

    params;
    label: string;

    agInit(params): void {
        this.params = params;
        this.label = this.params.label || null;
    }

    refresh(params?: any): boolean {
        return true;
    }

    onClick($event) {
        if (this.params.onClick instanceof Function) {
            // put anything into params u want pass into parents component
            const params = {
                event: $event,
                rowData: this.params.node.data
                // ...something
            }
            this.params.onClick(this.params);

        }
    }
}