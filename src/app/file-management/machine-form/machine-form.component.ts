import { MachineService } from './../../tools/services/machine.service';
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
  companyId: string; 
  luser: string;
  title: string = "注塑机新增";
  types = [];
  proxyCompanys = [];
  areas = [];
  machineForm: FormGroup;
  formErrors = {
    'machineCode': '',
    'machineName': '',
    'machineType': '',
    'moniterId': '',
    'outFactoryDate': '',
    'proxyCompany': '',
    'area': '',
    'type': '',
  }
  validationMessages = {
    'machineCode': {
      'required': '必填!'
    },
    'machineName': {
      'required': '必填!'
    },
    'machineType': {
      'required': '必填!'
    },
    'moniterId': {
      'required': '必填!',
      'pattern': '请填写数字!'
    },
    'outFactoryDate': {
      'required': '必填!'
    },
    'proxyCompany': {
      'required': '必填!'
    },
    'area': {
      'required': '必填!'
    },
    'type': {
      'required': '必填!'
    },
  };
  item: any;
  
  constructor(private fb: FormBuilder,
    private bsModalRef: BsModalRef,
    private modalService: BsModalService,
    private gs: GlobalService,
    private ms: MachineService) {
  }

  ngOnInit() {
    this.createForm();
    this.companyId = localStorage.getItem('companyId')
    this.luser = localStorage.getItem('id');
    this.item = this.modalService.config.initialState['item'];
    this.bindData();
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
      'moniterId': ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      'outFactoryPerson': [''],
      'outFactoryDate': ['', Validators.required],
      'proxyCompany': ['', Validators.required],
      'area': ['', Validators.required],
      'gpsInfo': [''],
      'type': ['', Validators.required],
      'remarks': [''],
    });
    this.machineForm.valueChanges.subscribe(data => {
      if (!this.machineForm) return;
      for (const field in this.formErrors) {
        this.formErrors[field] = '';
        const control = this.machineForm.get(field);
        //console.log(control.valid);
        if (control && (control.dirty || control.touched) && !control.valid) {
          console.log(control.errors);
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            this.formErrors[field] += messages[key] + ' ';
          }
        }
      }
    });
  }

  /**
   * 绑定下拉框值
   */
  bindSelect() {
    this.types = [];
    this.proxyCompanys = [];
    this.areas = [];
    this.ms.getTypes(this.companyId).subscribe(json => {
      if (json.obj && json.obj.length > 0) {
        json.obj.forEach(obj => {
          this.types.push({ id: obj.id, name: obj.name });
          if (this.item && obj.name == this.item.type) {
            this.machineForm.controls['type'].setValue(obj.id);
          }
        });
      }
    });
    this.ms.getProxyCompanys(this.companyId).subscribe(json => {
      if (json.obj && json.obj.length > 0) {
        json.obj.forEach(obj => {
          console.log({ id: obj.id, name: obj.name });
          this.proxyCompanys.push({ id: obj.id, name: obj.name });
          if (this.item && obj.name == this.item.proxyCompany) {
            this.machineForm.controls['proxyCompany'].setValue(obj.id);
          }
        });
      }
    });
    this.ms.getAreas(this.companyId).subscribe(json => {
      if (json.obj && json.obj.length > 0) {
        json.obj.forEach(obj => {
          this.areas.push({ id: obj.id, name: obj.name });
          if (this.item && obj.name == this.item.area) {
            this.machineForm.controls['area'].setValue(obj.id);
          }
        });
      }
    });
  }

  /**
   * 绑定编辑功能时的数据
   */
  bindData() {
    if (this.item) {
      console.log(this.item);
      this.machineForm.reset(this.item);
    }
  }

  /**
   * 关闭表单
   */
  close() {
    this.bsModalRef.hide();
  }

  /**
   * 表单提交
   * @param formValue form对象值
   */
  submit(formValue) {
    if (this.item) {
      console.log(formValue,this.item);
      this.ms.editDevice(this.companyId, this.luser, this.item.id, formValue).subscribe(json => {
        if (json.code == 200) {
          this.bsModalRef.hide();
        }
      });
    } else {
      this.ms.addDevice(this.companyId, this.luser, formValue).subscribe(json => {
        if (json.code == 200) {
          this.bsModalRef.hide();
        }
      });
    }
  }

}
