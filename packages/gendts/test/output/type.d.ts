type ComonRes = {
      /** 响应码 */
      code: number;
      /** 提示信息 */
      message: string;
    }
type UserDTO = {
      /**
       * 用户id 
       * @description 用户id
       */
      id: number;
      /**
       * 用户名 
       * @description 用户名
       */
      uname: string;
      /**
       * 昵称 
       * @description 昵称
       */
      nickname: string;
      /**
       * 性别 
       * @description 性别
       */
      sex: string;
      /**
       * 手机号 
       * @description 手机号
       */
      mobile: string;
      /**
       * 邮箱 
       * @description 邮箱
       */
      email: string;
      /**
       * 启用状态 
       * @description 启用状态
       */
      enabled: string;
      /**
       * 创建时间 
       * @description 创建时间
       */
      created_at: string;
      /**
       * 创建人 
       * @description 创建人
       */
      created_by: string;
      /**
       * 更新时间 
       * @description 更新时间
       */
      updated_at: string;
      /**
       * 更新人 
       * @description 更新人
       */
      updated_by: string;
    }
type UserCreateParam = {
      /**
       * 用户名 
       * @description 用户名
       */
      uname: string;
      /**
       * 昵称 
       * @description 昵称
       */
      nickname?: string;
      /**
       * 性别 
       * @description 1-男 2-女
       */
      sex?: string;
      /**
       * 手机号 
       * @description 手机号
       */
      mobile?: string;
      /**
       * 邮箱 
       * @description 邮箱
       */
      email?: string;
    }
