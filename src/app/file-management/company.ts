import { Component, OnInit } from '@angular/core';
import { NavigationComponent } from '../produce-list/navigation';
import { SearchMachineidComponent } from '../search-machineid/search-machineid.component';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Global, GlobalService } from '../tools/services/global';
@Component({
  selector: 'company',
  templateUrl: './company.html',
  styleUrls: ['./Machine.scss']
})
export class Company implements OnInit {
  data: any;
  companyid: any;//公司id
  navigations: Array<string> = ['主页', '档案管理', '公司管理'];
  module_table_thead: Array<string> = ['公司名称', '公司地址', '联系电话', '公司状态', '备注信息'];
  module_table_body = [];
  module_table_attr: Array<string> = ['c_name', 'c_address', 'phone_number', 'c_states', 'remarks'];
  module_table_type: string = "company";
  module_table_search = { search: "c_name", name: "公司地址" }
  constructor(private gs: GlobalService) {

  }
  ngOnInit() {
    this.companyid = localStorage.getItem('companyid');
    this.getCompanyData(() => {
      var array = [];
      for (var i = 0; i < this.data.length; i++) {
        var item = { c_name: "", c_address: "", phone_number: "", c_states: "", remarks: "", id: "" };
        item.c_name = this.data[i].name;
        item.c_address = this.data[i].address;
        item.phone_number = this.data[i].phone;
        item.c_states = this.data[i].state;
        item.remarks = this.data[i].note;
        item.id = this.data[i].id;
        array.push(item);
      }
      this.module_table_body = [].concat(array);
    });
  }
  getCompanyData(callback) {
    this.gs.httpGet(Global.domain + 'api/apicompanys.action?companyId=' + this.companyid, {}, json => {
      this.data = json.obj;
      callback();
    })
  }
  getResult(msg) {
    this.getCompanyData(() => {
      var array = [];
      for (var i = 0; i < this.data.length; i++) {
        var item = { c_name: "", c_address: "", phone_number: "", c_states: "", remarks: "", id: "" };
        item.c_name = this.data[i].name;
        item.c_address = this.data[i].address;
        item.phone_number = this.data[i].phone;
        item.c_states = this.data[i].state;
        item.remarks = this.data[i].note;
        item.id = this.data[i].id;
        array.push(item);
      }
      this.module_table_body = [].concat(array);
    })
  }
}