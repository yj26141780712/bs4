import { Component, OnInit } from '@angular/core';
import { NavigationComponent } from '../produce-list/navigation';
import { SearchMachineidComponent } from '../search-machineid/search-machineid.component';
import { Global, GlobalService } from '../tools/services/global';
@Component({
  selector: 'areaManagement',
  templateUrl: './areaManagement.html',
  styleUrls: ['./Machine.scss']
})
export class AreaManagement implements OnInit {
  areaData: any;
  companyid: any;
  module_table_thead: Array<string> = ['片区名称', '备注信息'];
  navigations: Array<string> = ['主页', '档案管理', '片区管理'];
  module_table_body: Array<Object> = [];
  module_table_attr: Array<string> = ['area', 'remarks'];
  module_table_type: string = "area";
  module_table_search = { search: "area", name: "片区名称" }
  constructor(private gs: GlobalService) {
  }

  ngOnInit() {
    this.companyid = localStorage.getItem('companyid');
    this.getAreaData(() => {
      var array = []
      for (var i = 0; i < this.areaData.length; i++) {
        var object = { area: "", remarks: "", id: "" };
        object.area = this.areaData[i].name;
        object.remarks = this.areaData[i].note;
        object.id = this.areaData[i].id;
        array.push(object);
      }
      this.module_table_body = [].concat(array);
    });
  }
  getAreaData(callback) {
    this.gs.httpGet(Global.domain + 'api/apiareas.action?companyId=' + this.companyid, {}, json => {
      this.areaData = json.obj;
      callback();
    })
  }
  getResult(msg) {
    this.getAreaData(() => {
      var array = []
      for (var i = 0; i < this.areaData.length; i++) {
        var object = { area: "", remarks: "", id: "" };
        object.area = this.areaData[i].name;
        object.remarks = this.areaData[i].note;
        object.id = this.areaData[i].id;
        array.push(object);
      }
      this.module_table_body = [].concat(array);
    })
  }
}