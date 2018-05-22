import { MachineService } from './../tools/services/machine.service';
import { MachineFormComponent } from './machine-form/machine-form.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { GlobalService } from './../tools/services/global';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { NavigationComponent } from '../produce-list/navigation';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Global } from '../tools/services/global';

@Component({
  selector: 'Machine',
  templateUrl: './Machine.html',
  styleUrls: ['./Machine.scss']
})
export class Machine implements OnInit {

  bsModalRef: BsModalRef;
  companyId: any;
  settings: any;
  source: any[];
  operationObj: any;
  constructor(private gs: GlobalService,
    private modalService: BsModalService, private ms: MachineService) {
  }

  ngOnInit() {
    this.companyId = localStorage.getItem("companyId");
    this.createObservers();
    this.createOperation();
    this.bindSettings();
    this.bindSource();
  }

  /**
   * 组件交互事件 当新增编辑完之后重新绑定数据
   */
  createObservers() {
    this.modalService.onHide.subscribe(res => {
      this.bindSource();
    });
  }

  /**
   * 创建自定义操作
   */
  createOperation() {
    let self = this;
    this.operation.prototype.edit = (item) => {
      let initialState = {
        item: item
      }
      self.bsModalRef = self.modalService.show(MachineFormComponent, { initialState });
    }
    this.operation.prototype.delete = (item) => {
      console.log(self);
      self.gs.confirm().then(value => {
        if (value) {
          self.ms.delDevice(self.companyId, item.id).subscribe(json => { });
        }
      });
    }
    this.operationObj = new this.operation();
  }

  bindSettings() {
    this.settings = {
      columns: [
        { field: 'sn', title: '序号' },
        { field: 'machineCode', title: '注塑机编号' },
        { field: 'machineName', title: '注塑机名称' },
        { field: 'machineType', title: '注塑机类型' },
        { field: 'moniterId', title: '采集器编号' },
        { field: 'outFactoryPerson', title: '出厂调试人员' },
        { field: 'outFactoryDate', title: '出厂日期' },
        { field: 'area', title: '所属片区' },
        { field: 'outCompany', title: '出厂公司' },
        { field: 'proxyCompany', title: '代理公司' },
        { field: 'plasticCompany', title: '塑料厂' },
        { field: 'type', title: '类别' },
        { field: 'remarks', title: '备注' },
      ],
      operation: [
        { type: 'edit', iconClass: 'fa-pencil', title: "编辑", callBack: this.operationObj.edit, self: this },
        { type: 'delete', iconClass: 'fa-trash', title: "删除", callBack: this.operationObj.delete, self: this },
      ],
      search: { search: "m_id", name: "注塑机编号" },
    }
  }

  bindSource() {
    this.ms.getDeviceList(this.companyId).subscribe(json => {
      if (json.code == 200) {
        let data = json.obj;
        var array = [];
        for (var i = 0; i < data.length; i++) {
          let item: any = {};
          item.sn = (i + 1) + '';
          item.machineCode = data[i].sn;
          item.machineName = data[i].name;
          item.machineType = data[i].deviceType;
          item.moniterId = data[i].monitorid;
          item.outFactoryPerson = data[i].cpersonnel || '';
          if (data[i].ddate != null) {
            item.outFactoryDate = data[i].ddate.substring(0, 10);
          }
          item.area = data[i].areaName;
          item.outCompany = data[i].companyName;
          item.proxyCompany = data[i].proxyName;
          item.plasticCompany = data[i].factoryName;
          item.type = data[i].modelName;
          item.remarks = data[i].note || '';
          item.id = data[i].id;
          item.gpsInfo = data[i].x && data[i].y ? data[i].x + ',' + data[i].y : ''
          array.push(item);
        }
        this.source = [].concat(array);
      }
    })
  }

  add() {
    this.bsModalRef = this.modalService.show(MachineFormComponent);
  }

  operation() {
    let self = this;
  }
}