import { ILoginData, ISignUpData } from "./global_interfaces";

export interface IBasicFormProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  children: JSX.Element;
  showTitleModal: boolean;
  titleModal: JSX.Element;
  footerModal: JSX.Element;
  showFooterModal: boolean;
}

export interface ISignUpFormProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setTitleModal: React.Dispatch<React.SetStateAction<JSX.Element>>;
  setFooterModal: React.Dispatch<React.SetStateAction<JSX.Element>>;
  setShowFooterModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowTitleModal: React.Dispatch<React.SetStateAction<boolean>>;
  signUpType: boolean;
  setUser: (user: any, token: any) => {
    type: string;
    payload: {
        user: any;
        token: any;
    };
};
}

export interface ILoginFormProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ISignFormRightProps {
  onSubmit: (e: any) => void;
  showFinalStep: boolean;
  setSignUpData: React.Dispatch<React.SetStateAction<ISignUpData>>;
  signUpData: ISignUpData;
  loginData: ILoginData;
  setLoginData: React.Dispatch<React.SetStateAction<ILoginData>>;
  signUpType: boolean;
  onSubmitLogin: (e: any) => void;
  setSignUpType: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IBasicModalFooterProps {
  handleBack: () => void; 
  onSubmit: (e: any) => Promise<void>
}

export interface IFirstSignUpProps {
  onSubmit: (e: any) => void;
  setSignUpData: React.Dispatch<React.SetStateAction<ISignUpData>>;
  signUpData: ISignUpData;
  setSignUpType: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ILoginProps {
  onSubmit: (e: any) => void;
  setLoginData: React.Dispatch<React.SetStateAction<ILoginData>>;
  loginData: ILoginData;
  setSignUpType: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IFinalSignUpProps {
  signUpData: ISignUpData; 
  setSignUpData: React.Dispatch<React.SetStateAction<ISignUpData>>
}