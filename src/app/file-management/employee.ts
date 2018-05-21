import { Component, OnInit } from '@angular/core';
import { NavigationComponent } from '../produce-list/navigation';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { SearchMachineidComponent } from '../search-machineid/search-machineid.component';
import { Global, GlobalService } from '../tools/services/global';
@Component({
  selector: 'employee',
  templateUrl: './employee.html',
  styleUrls: ['./Machine.scss']
})
export class Employee implements OnInit {
  data: any;
  companyid: any;
  navigations: Array<string> = ['主页', '档案管理', '用户管理'];
  module_table_thead: Array<string> = ['用户账号', '角色信息', '对应公司', '用户姓名', '联系电话', '备注信息', '状态'];
  module_table_body: Array<Object> = [];
  module_table_attr: Array<string> = ['user_id', 'user_message', 'company', 'username', 'phone', 'note', 'state'];
  module_table_type: string = "employee";
  module_table_search = { search: "user_id", name: "用户账号" }
  constructor(private gs: GlobalService) { }

  ngOnInit() {
    this.companyid = localStorage.getItem('companyid');
    this.getEmployee(() => {
      var array = [];
      for (var i = 0; i < this.data.length; i++) {
        var item = { user_id: "", user_message: "", company: "", username: "", phone: "", note: "", state: "", id: "", password: "", roleid: "" };
        item.user_id = this.data[i].username;
        item.user_message = this.data[i].roleName;
        item.company = this.data[i].companyName;
        item.username = this.data[i].name;
        item.phone = this.data[i].phone;
        item.note = this.data[i].note;
        item.state = this.data[i].status == 0 ? "正常" : "停用";
        item.id = this.data[i].id;
        item.password = this.data[i].password;
        item.roleid = this.data[i].roleid;
        array.push(item);
      }
      this.module_table_body = [].concat(array);
    });
  }
  getEmployee(callback) {
    this.gs.httpGet(Global.domain + 'api/apishowCompanyUsers.action?companyId=' + this.companyid, {}, json => {
      this.data = json.obj;
      callback();
    })
  }
  getResult(msg) {
    this.getEmployee(() => {
      var array = [];
      for (var i = 0; i < this.data.length; i++) {
        var item = { user_id: "", user_message: "", company: "", username: "", phone: "", note: "", state: "", id: "", password: "", roleid: "" };
        item.user_id = this.data[i].username;
        item.user_message = this.data[i].roleName;
        item.company = this.data[i].companyName;
        item.username = this.data[i].name;
        item.phone = this.data[i].phone;
        item.note = this.data[i].note;
        item.state = this.data[i].status == 0 ? "正常" : "停用";
        item.id = this.data[i].id;
        item.password = this.data[i].password;
        item.roleid = this.data[i].roleid;
        array.push(item);
      }
      this.module_table_body = [].concat(array);
    });
  }
}