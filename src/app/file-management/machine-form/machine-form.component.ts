import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GlobalService, Global } from '../../tools/services/global';

@Component({
  selector: 'app-machine-form',
  templateUrl: './machine-form.component.html',
  styleUrls: ['./machine-form.component.scss']
})
export class MachineFormComponent implements OnInit { 
  companyid: string;
  title: string = "注塑机新增";
  types = [];
  proxyCompanys = [];
  areas = [];
  machineForm: FormGroup;
  constructor(private fb: FormBuilder,private bsModalRef: BsModalRef,private modalService: BsModalService, private gs: GlobalService) {
    this.createForm();
  }

  ngOnInit() {
    console.log(this.modalService.config);
     this.modalService.config
     this.bindSelect();
  }

  /**
   * 创建表单
   */
  createForm() {
    this.machineForm = this.fb.group({
      'machineCode': ['', Validators.required],
      'machineName': ['', Validators.required],
      'machineType': ['', Validators.required],
      'moniterId': ['', Validators.required],
      'outFactoryPerson': ['', Validators.required],
      'outFactoryDate': ['', Validators.required],
      'proxyCompany': ['', Validators.required],
      'area': ['', Validators.required],
      'gpsInfo': ['', Validators.required],
      'type': ['', Validators.required],
      'remarks': ['', Validators.required],
    });
  }

  /**
   * 绑定下拉框值
   */
  bindSelect() {
    this.companyid = localStorage.getItem("companyid");
    let urlMachineTypes = Global.domain + "api/apifindModelsByCompany.action";
    let urlProxyCompanys = Global.domain + "api/apicompanys.action";
    let urlAreas = Global.domain + "api/apiareas.action";
    this.types = [];
    this.proxyCompanys = [];
    this.areas = [];
    this.gs.httpGet(urlMachineTypes, { companyId: this.companyid }, json => {
      if (json.obj && json.obj.length > 0) {
        json.obj.forEach(obj => {
          this.types.push({ id: obj.id, name: obj.name });
        });
      }
    });
    this.gs.httpGet(urlProxyCompanys, { companyId: this.companyid }, json => {
      if (json.obj && json.obj.length > 0) {
        json.obj.forEach(obj => {
          this.proxyCompanys.push({ id: obj.id, name: obj.name });
        });
      }
    });
    this.gs.httpGet(urlAreas, { companyId: this.companyid }, json => {
      if (json.obj && json.obj.length > 0) {
        json.obj.forEach(obj => {
          this.areas.push({ id: obj.id, name: obj.name });
        });
      }
    });
  }

  /**
   * 关闭表单
   */
  close() {
    this.bsModalRef.hide();
  }

  submit(formValue) {
    console.log(123);
      console.log(formValue);
  }
}
