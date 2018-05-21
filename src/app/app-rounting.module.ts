import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { IlinkMapComponent } from './ilink-map/ilink-map.component';
import { ProduceListComponent } from './produce-list/produce-list.component';
import { TimeDataComponent } from './time-data/time-data.component';
import { SearchMachineidComponent } from './search-machineid/search-machineid.component';
import { NavigationComponent } from './produce-list/navigation';
import { ProduceTable } from './produce-list/produce-table';
import { ModuleTable } from './produce-list/module-table';
import { RemotelyComponent } from './remotely/remotely.component';
import { ShutDown } from './remotely/ShutDown';
import { ParamMessage } from './remotely/paramMessage';
import { ProduceData } from './remotely/produceData';
import { TimelyTemperature } from './remotely/timelyTemperature';
import { SmoothMessage } from './remotely/smoothMessage';
import { Machine } from './file-management/Machine';
import { AreaManagement } from './file-management/areaManagement';
import { Employee } from './file-management/employee';
import { Company } from './file-management/company';
import { OperationLog } from './file-management/OperationLog';
import { iLinklogin } from './login/iLinklogin';
import { Client } from './file-management/client';

//update by yangjie 20180502 修改路由配置 home改为懒加载并修改 根页面路由出口
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },//path为空，表示指向根目录，默认路由
  { path: 'login', component: iLinklogin },
  { path: 'home', loadChildren:"app/home/home.module#HomeModule"},
  { path: '**', component: iLinklogin }//默认进入哪个界面 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [
    RouterModule
  ],
  providers: [],
})
export class AppRoutingModule { 
    
}
