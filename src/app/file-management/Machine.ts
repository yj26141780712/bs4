import { MachineFormComponent } from './machine-form/machine-form.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { GlobalService } from './../tools/services/global';
import { Component, OnInit } from '@angular/core';
import { NavigationComponent } from '../produce-list/navigation';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Global } from '../tools/services/global';
@Component({
  selector: 'Machine',
  templateUrl: './Machine.html',
  styleUrls: ['./Machine.scss']
})
export class Machine implements OnInit {

  // data: any;
  // navigations: Array<string> = ['主页', '档案管理', '注塑机管理'];
  // module_table_thead: Array<string> = ['注塑机编号', '注塑机名称', '注塑机类型', '采集器编号', '出厂调试人员', '出厂日期', '所属片区', '出厂公司', '代理公司', '塑料厂', '备注信息'];
  // module_table_body: Array<Object> = [];
  // module_table_search = { search: "m_id", name: "注塑机编号" };
  // module_table_attr: Array<string> = ['m_id', 'm_name', 'm_type', 'c_id', 'o_name', 'o_date', 'area', 'o_company', 'd_company', 's_company', 'remarks'];
  // module_table_type: string = "machine";
  bsModalRef: BsModalRef;
  companyid: any;
  settings: any;
  source: any[];

  constructor(private gs: GlobalService, private modalService: BsModalService) {

  }
  ngOnInit() {
    this.companyid = localStorage.getItem("companyid");
    this.settings = {
      columns: [
        { field: 'sn', title: '序号' },
        { field: 'm_id', title: '注塑机编号' },
        { field: 'm_name', title: '注塑机名称' },
        { field: 'm_type', title: '注塑机类型' },
        { field: 'c_id', title: '采集器编号' },
        { field: 'o_name', title: '出厂调试人员' },
        { field: 'o_date', title: '出厂日期' },
        { field: 'area', title: '所属片区' },
        { field: 'o_company', title: '出厂公司' },
        { field: 'd_company', title: '代理公司' },
        { field: 's_company', title: '塑料厂' },
      ],
      operation: [
        { type: 'edit', iconClass: 'fa-pencil', title: "编辑" },
        { type: 'delete', iconClass: 'fa-trash', title: "删除" },
        // { type: 'download', iconClass: 'fa-trash', title: "删除" },
        // { type: 'download', iconClass: 'fa-trash', title: "删除" },
      ],
      search: { search: "m_id", name: "注塑机编号" },
    }
    let url = Global.domain + "api/apideviceList.action";
    this.gs.httpGet(url, { companyId: this.companyid }, json => {
      if (json.code == 200) {
        let data = json.obj;
        var array = [];
        for (var i = 0; i < data.length; i++) {
          var item = { sn: "", m_id: "", m_name: "", m_type: "", c_id: "", o_name: "", o_date: "", area: "", o_company: "", d_company: "", s_company: "", remarks: "", id: "", x: "", y: "" };
          item.sn = (i + 1) + '';
          item.m_id = data[i].sn;
          item.m_name = data[i].name;
          item.m_type = data[i].modelName;
          item.c_id = data[i].monitorid;
          item.o_name = data[i].cpersonnel || '';
          if (data[i].ddate != null) {
            item.o_date = data[i].ddate.substring(0, 10);
          }
          item.area = data[i].areaName;
          item.o_company = data[i].companyName;
          item.d_company = data[i].proxyName;
          item.s_company = data[i].factoryName;
          item.id = data[i].id;
          item.x = data[i].x;
          item.y = data[i].y;
          array.push(item);
        }
        this.source = [].concat(array);
      }
    });
  }

  operationEvent(op) {
    console.log(op);
    switch (op.type) {
      case "edit":
        const initialState = { 
          item: op.item
        };
        this.bsModalRef = this.modalService.show(MachineFormComponent, { initialState });
        break;
      default:
        break;
    }
  }

  addEvent() {
    this.bsModalRef = this.modalService.show(MachineFormComponent);
  }
}