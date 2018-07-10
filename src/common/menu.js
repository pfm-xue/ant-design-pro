import { isUrl } from '../utils/utils';

const menuData = [
  {
    name: 'ホーム',
    icon: 'home',
    path: 'dashboard',
    children: [
      // {
      //   name: '分析页',
      //   path: 'analysis',
      // },
      // {
      //   name: '监控页',
      //   path: 'monitor',
      // },
      {
        name: 'タスク一覧',
        path: 'tasklist',
      },
    ],
  },
  // {
  //   name: 'ユーザー詳細情報',
  //   icon: 'form',
  //   path: 'form',
  //   children: [
  //     {
  //       name: '画像のアップロード',
  //       path: 'basic-form',
  //     },
  //     {
  //       name: '分步表单',
  //       path: 'step-form',
  //     },
  //     {
  //       name: '個別機能訓練計画書',
  //       path: 'advanced-form',
  //     },
  //   ],
  // },
  // {
  //   name: '列表页',
  //   icon: 'table',
  //   path: 'list',
  //   children: [
  //     {
  //       name: '查询表格',
  //       path: 'table-list',
  //     },
  //     {
  //       name: '标准列表',
  //       path: 'basic-list',
  //     },
  //     {
  //       name: '卡片列表',
  //       path: 'card-list',
  //     },
  //     {
  //       name: '搜索列表',
  //       path: 'search',
  //       children: [
  //         {
  //           name: '搜索列表（文章）',
  //           path: 'articles',
  //         },
  //         {
  //           name: '搜索列表（项目）',
  //           path: 'projects',
  //         },
  //         {
  //           name: '搜索列表（应用）',
  //           path: 'applications',
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   name: '利用者一覧',
  //   icon: 'profile',
  //   path: 'profile',
  //   children: [
  //     {
  //       name: 'ユーザー詳細情報',
  //       path: 'basic',
  //     },
  //     {
  //       name: '高级详情页',
  //       path: 'advanced',
  //       authority: 'admin',
  //     },
  //   ],
  // },
  // {
  //   name: '结果页',
  //   icon: 'check-circle-o',
  //   path: 'result',
  //   children: [
  //     {
  //       name: '成功',
  //       path: 'success',
  //     },
  //     {
  //       name: '失败',
  //       path: 'fail',
  //     },
  //   ],
  // },
  // {
  //   name: '异常页',
  //   icon: 'warning',
  //   path: 'exception',
  //   children: [
  //     {
  //       name: '403',
  //       path: '403',
  //     },
  //     {
  //       name: '404',
  //       path: '404',
  //     },
  //     {
  //       name: '500',
  //       path: '500',
  //     },
  //     {
  //       name: '触发异常',
  //       path: 'trigger',
  //       hideInMenu: true,
  //     },
  //   ],
  // },
  // {
  //   name: '账户',
  //   icon: 'user',
  //   path: 'user',
  //   authority: 'guest',
  //   children: [
  //     {
  //       name: '登录',
  //       path: 'login',
  //     },
  //     {
  //       name: '注册',
  //       path: 'register',
  //     },
  //     {
  //       name: '注册结果',
  //       path: 'register-result',
  //     },
  //   ],
  // },
  {
    name: '管理者管理',
    icon: 'form',
    path: 'role',
    children: [
      {
        name: '管理者一覧',
        path: 'physician-role',
      },
      // {
      //   name: '管理者情報',
      //   path: 'physician-show',
      // }
    ],
  },
  {
    name: '利用者管理',
    icon: 'user',
    path: 'patient',
    children: [
      {
        name: '利用者一覧',
        path: 'list-patient',
      },
      // {
      //   name: '利用者一覧new',
      //   path: 'list-patientNew',
      // },
    ],
  },
  {
    name: 'スケジュール管理',
    icon: 'table',
    path: 'schedule',
    children: [
      {
        name: '管理者',
        path: 'roles',
      },
      {
        name: '利用者',
        path: 'patient',
      },
    ],
  },
  {
    name: 'データ辞書',
    icon: 'layout',
    path: 'dictionary',
    children: [
      {
        name: '計画書',
        path: 'plan-dictionary',
      },
    ],
  },
];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
