import { stringify } from 'qs';
import request from '../utils/request';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function queryRole() {
  return request(`http://localhost:3001/mp/admin/?page=1`);
}

export async function queryTask() {
  return request(`http://localhost:3001/mp/task/?page=1`);
}

export async function queryTemplate() {
  return request(`http://localhost:3001/mp/template/?page=1`);
}

export async function queryAssessment() {
  return request(`http://localhost:3001/mp/assessment/?page=1`);
}

export async function queryPlan() {
  return request(`http://localhost:3001/mp/plan/?page=1`);
}

export async function queryUser() {
  return request(`http://localhost:3001/mp/user/?page=1`);
}

export async function showUser(params) {
  return request(`http://localhost:3001/mp/user/${params}`);
}

export async function showTemplate(params) {
  return request(`http://localhost:3001/mp/template/${params}`);
}

export async function showPlan(params) {
  return request(`http://localhost:3001/mp/plan/${params}`);
}

export async function showAssessment(params) {
  return request(`http://localhost:3001/mp/assessment/${params}`);
}

export async function queryTaskUser(params) {
  return request(`http://localhost:3001/mp/task/${params}`);
}

export async function userShow(params) {
  return request(`http://localhost:3001/mp/user/${params}`);
}

export async function roleShow(params) {
  return request(`http://localhost:3001/mp/admin/${params}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: params,
    // body: {
    //   ...params,
    //   method: 'post',
    // },
  });
}

export async function addAssessment(params) {
  return request('http://localhost:3001/mp/assessment/', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function addTemplate(params) {
  return request('http://localhost:3001/mp/template/', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function addPlan(params) {
  return request('http://localhost:3001/mp/plan/', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function addUser(params) {
  return request('http://localhost:3001/mp/user/', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function addRole(params) {
  return request('http://localhost:3001/mp/admin/', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function addTask(params) {
  return request('http://localhost:3001/mp/task/', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function fakeAccountLogin(params) {
  return request('http://localhost:3001/mp/admin/', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
      login: true,
    },
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}
