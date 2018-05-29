// const config = require('./config');
const logger = require('./lib/logging').getLogger('mongoose');

const Categories = require('./models/categories.model');
const Contents = require('./models/contents.model');
const Features = require('./models/features.model');
const Media = require('./models/media.model');
const Models = require('./models/models.model');
const Options = require('./models/options.model');

const bcrypt = require('bcryptjs');

const mongoose = require('mongoose');

mongoose.set('debug', true);

const options = {
  useMongoClient: false,
  autoIndex: false,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
  poolSize: 10,
  bufferMaxEntries: 0
};

mongoose.connect(config.mongoose.connect, options);
mongoose.Promise = global.Promise;
const conn = exports.conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'mongo connection error.'));

// Plan:計画書
const planSchema = mongoose.Schema({
  createDate: Date,  // 作成日
  createLastTime: Date,  // 前回作成日
  planAuthor: String, // 計画作成者

  // phonetic: String, // ふりがな
  // sex: Number, // 性別
  // birth: Date, // 生年月日
  // name: String, // 氏名

  certification: String, // 介護認定
  admin: String,  // 管理者
  nursing: String,  // 看護
  nursingCare: String, // 介護
  functionalTraining: String, // 機能訓練
  counselor: String, // 相談員
  oneselfDesire: String, // 本人の希望
  familyDesire: String,  // 家族の希望
  disorder: String,  // 障害老人の日常生活自立度
  dementia: String, // 認知症老人の日常生活自立度
  diseaseName: String, // 病名、合併症(心疾患、吸器疾患等)
  exerciseRisk: String, // 運動時のリスク(血圧、不整脈、呼吸等)
  lifeIssues: String, // 生活課題
  homeEnvironment: String, // 在宅環境(生活課題に関連する在宅環境課題)
  // 個別機能訓練加算Ⅰ
  additionalTraining: {
    longTermGoals: String,　// 長期目標
    longTermGoalsDegree: String,　// 目標逹成度
    shortTermGoals: String,　// 短期目標
    shortTermGoalsDegree: String,　// 目標逹成度
    enum: [{
      programContent: String,　// プログラム内容
      attention: String,　// 留意点
      frequency: String,　// 頻度
      time: String,　// 時間
      personLiable: String,　// 主な実施者
    }],
  },
  // 個別機能訓練計画書Ⅱ
  planTow: {
    longTermGoals: String,　// 長期目標
    longTermGoalsDegree: String,　// 目標逹成度
    shortTermGoals: String,　// 短期目標
    shortTermGoalsDegree: String,　// 目標逹成度
    enum: [{
      programContent: String,　// プログラム内容
      attention: String,　// 留意点
      frequency: String,　// 頻度
      time: String,　// 時間
      personLiable: String,　// 主な実施者
    }],
  },
  specialNotes: String, // 特記事項
  planBook: [
    {
      type: mongoose.Schema.Types.ObjectId,   // assessment:アセスメント
      ref: 'Assessment',
      index: true,
    }
  ],
  delete_flag: {
    type: Boolean,
    default: false,
  },
  create_date: {
    type: Date,
    default: Date.now,
  },  
});

// Admin:管理者
const adminSchema = mongoose.Schema({
  adminId: {
    type: String,
    unique: true,
  },
  adminNmae: String,　　//　管理者名前
  email: String,　　　//　Email
  telephoneNumber: String,  //  電話番号
  role: String,　　//　役割
  delete_flag: {
    type: Boolean,
    default: false,
  },
  create_date: {
    type: Date,
    default: Date.now,
  },
});


// user:使用者
const userSchema = mongoose.Schema({
  name: String, // 氏名
  phonetic: String, // ふりがな
  sex: Number, // 性別
  birth: Date, // 生年月日
  planBook: [
    {
      type: mongoose.Schema.Types.ObjectId,   // 個別機能訓綶計画
      ref: 'Plan',
      index: true,
    }
  ],
  image:[
    String,     // 画像
  ],
  delete_flag: {
    type: Boolean,
    default: false,
  },
});

// assessment:アセスメント
const assessmentSchema = mongoose.Schema({
  //    関節可動域
  joint_arm: Number,            // 上肢
  joint_legs: Number,           // 下肢
  joint_runk: Number,           // 体幹
  //    筋力
  tendon_arm: Number,           // 上肢
  tendon_legs: Number,          // 下肢
  tendon_runk: Number,          // 体幹
  //    麻痺
  paralysis_arm: Number,        // 上肢
  paralysis_legs: Number,       // 下肢
  paralysis_finger: Number,     // 手指
  //    ADL Barthel Index
  meal: Number,                  // 食事
  move: Number,                  // 車椅子〜ベッドへの移乗
  aesthetic: Number,             // 整容
  toilet: Number,                // トイレ動作
  bath: Number,                  // 入浴
  walking: Number,               // 歩行
  stairs: Number,                // 階段昇降
  change: Number,                // 着替え
  defecation: Number,            // 排便コントロール
  total: Number,                 // 合計点
  //    家庭でのIADL
  shopping: Number,              // 買い物
  cook: Number,                  // 調理
  cleaning: Number,              // 掃除
  washing: Number,               // 洗濯  
  delete_flag: {
    type: Boolean,
    default: false,
  },
});


const Plan = exports.Plan = mongoose.model('Plan', planSchema);
const User = exports.User = mongoose.model('User', userSchema);
const Admin = exports.Admin = mongoose.model('Admin', adminSchema);
const Assessment = exports.Assessment = mongoose.model('Assessment', assessmentSchema);

//cms
exports.Categories = Categories;
exports.Contents = Contents;
exports.Features = Features;
exports.Media = Media;
exports.Models = Models;
exports.Options = Options;
