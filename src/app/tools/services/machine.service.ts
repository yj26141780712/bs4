import { Company } from './../../file-management/company';
import { Http } from '@angular/http';
import { GlobalService, Global } from './global';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MachineService {

  constructor(private gs: GlobalService) { }

  /**
   * 获取设备信息列表
   * @param companyId 公司Id
   */
  getDeviceList(companyId: string): Observable<any> {
    return this.gs.httpGetObservable(Global.domain + 'api/apideviceList.action', { companyId: companyId });
  }


  /**
   * 新增注塑机
   * @param companyId 公司Id
   * @param luser 用户Id
   * @param obj 注塑机数据对象 
   */
  addDevice(companyId: string, luser: string, obj): Observable<any> {
    return this.gs.httpGetObservable(Global.domain + 'api/apideviceAdd.action', {
      'device.sn': obj.machineCode,
      'device.name': obj.machineName,
      'device.deviceType': obj.machineType,
      'device.monitorid': obj.moniterId,
      'device.cpersonnel': obj.outFactoryPerson,
      'device.ddate': obj.outFactoryDate,
      'device.proxyid': obj.proxyCompany,
      'device.areaid': obj.area,
      'device.gps': obj.gpsInfo,
      'device.modelid': obj.type, //model
      'device.note': obj.remarks,
      'device.companyid': companyId,
      'device.luser': luser,
    });
  }

  /**
   * 
   * @param companyId 公司Id
   * @param luser 用户Id
   * @param deviceId 注塑机Id
   * @param obj 注塑机数据对象
   */
  editDevice(companyId: string, luser: string, deviceId: string, obj): Observable<any> {
    return this.gs.httpGetObservable(Global.domain + 'api/apideviceEdit.action', {
      'device.sn': obj.machineCode,
      'device.name': obj.machineName,
      'device.deviceType': obj.machineType,
      'device.monitorid': obj.moniterId,
      'device.cpersonnel': obj.outFactoryPerson,
      'device.ddate': obj.outFactoryDate,
      'device.proxyid': obj.proxyCompany,
      'device.areaid': obj.area,
      'device.gps': obj.gpsInfo,
      'device.modelid': obj.type, //model
      'device.note': obj.remarks,
      'device.companyid': companyId,
      'device.luser': luser,
      'device.id': deviceId,
      'type': '1'
    });
  }

  /**
   * 删除注塑机资料
   * @param companyId 公司Id
   * @param deviceId 注塑机Id
   */
  delDevice(companyId: string, deviceId: string): Observable<any> {
    return this.gs.httpGetObservable(Global.domain + 'api/apideviceDel.action', { companyId: companyId, deviceId: deviceId });
  }

  /**
   * 获取类别(全电,138机型等)
   * @param companyId 公司Id
   */
  getTypes(companyId: string) {
    return this.gs.httpGetObservable(Global.domain + 'api/apifindModelsByCompany.action', { companyId: companyId });
  }

  /**
   * 获取代理公司
   * @param companyId 公司Id
   */
  getProxyCompanys(companyId: string) {
    return this.gs.httpGetObservable(Global.domain + 'api/apicompanys.action', { companyId: companyId });
  }

  /**
   * 获取片区
   * @param companyId 公司Id
   */
  getAreas(companyId: string) {
    return this.gs.httpGetObservable(Global.domain + 'api/apiareas.action', { companyId: companyId });
  }
}
