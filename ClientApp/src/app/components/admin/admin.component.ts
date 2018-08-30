import { ChartData } from './../../models/chart-data';
import { VehicleService } from './../../services/vehice.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {
    data = {
        labels: [],
        datasets: [
            {
                data: [],
                backgroundColor: []
            }
        ]
    };
    hasData = false;

    private getRandomColor(): string {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    constructor(private vehicleService: VehicleService) { }

    ngOnInit(): void {
        this.vehicleService.getChartData()
            .subscribe(x => {
                x.forEach(d => {
                    this.data.labels.push(d.name);
                    this.data.datasets[0].data.push(d.count);
                    const randomColor = this.getRandomColor();
                    this.data.datasets[0].backgroundColor.push(randomColor);
                });
                this.hasData = true;
            });

    }
}
