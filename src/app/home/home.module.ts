import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { IlinkMapComponent } from '../ilink-map/ilink-map.component';
import { TimeDataComponent } from '../time-data/time-data.component';
import { ProduceListComponent } from '../produce-list/produce-list.component';
import { SearchMachineidComponent } from '../search-machineid/search-machineid.component';
import { NavigationComponent } from '../produce-list/navigation';
import { ProduceTable } from '../produce-list/produce-table';
import { ModuleTable } from '../produce-list/module-table';
import { RemotelyComponent } from '../remotely/remotely.component';
import { ShutDown } from '../remotely/ShutDown';
import { ParamMessage } from '../remotely/paramMessage';
import { ProduceData } from '../remotely/produceData';
import { TimelyTemperature } from '../remotely/timelyTemperature';
import { SmoothMessage } from '../remotely/smoothMessage';
import { selectAddress } from '../remotely/selectAddress';
import { Machine } from '../file-management/Machine';
import { AreaManagement } from '../file-management/areaManagement';
import { Employee } from '../file-management/employee';
import { Company } from '../file-management/company';
import { OperationLog } from '../file-management/OperationLog';
import { Client } from '../file-management/client';
import { HomeComponent } from './home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FittingComponent } from '../file-management/fitting/fitting.component';

import { ModalModule,PaginationModule } from 'ngx-bootstrap';
import { SetMachineComponent } from '../file-management/set-machine/set-machine.component';
import { KeysPipe } from '../tools/pipe/keys.pipe';
import { RegisterComponent } from '../register/register.component';
import { FactoryInfoComponent } from '../file-management/factory-info/factory-info.component';
import { MachineFormComponent } from '../file-management/machine-form/machine-form.component';
import { FixTableComponent } from '../fix-table/fix-table.component';
import { MachineComponent } from '../file-management/machine/machine.component';
import { TableComponent } from '../table/table.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HomeRoutingModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot()
  ],
  declarations: [
    HomeComponent,    
    IlinkMapComponent,
    ProduceListComponent,
    TimeDataComponent,
    SearchMachineidComponent,
    NavigationComponent,
    ProduceTable,
    ModuleTable,
    RemotelyComponent,
    ShutDown,
    ParamMessage,
    ProduceData,
    TimelyTemperature,
    SmoothMessage,
    selectAddress,
    Machine,
    AreaManagement,
    Employee,
    Company,
    OperationLog,
    Client,
    FittingComponent,
    SetMachineComponent,
    KeysPipe,
    KeysPipe,
    FactoryInfoComponent,
    MachineFormComponent,
    FixTableComponent,
    MachineComponent,
    TableComponent
  ],
  entryComponents:[FittingComponent,SetMachineComponent,MachineFormComponent]  
})
export class HomeModule { 

}
