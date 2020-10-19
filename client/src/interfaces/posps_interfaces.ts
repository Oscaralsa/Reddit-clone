import { ISignUpData } from "./global_interfaces";

export interface IBasicFormProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  children: any;
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
}

export interface ISignUpFormRightProps {
  onSubmit: (e: any) => void;
  showFinalStep: boolean;
  setSignUpData: React.Dispatch<React.SetStateAction<ISignUpData>>;
  signUpData: ISignUpData;
}

export interface IBasicModalFooterProps {
  handleBack: () => void; 
  onSubmit: (e: any) => Promise<void>
}

export interface IFirstSignUpProps {
  onSubmit: (e: any) => void;
  setSignUpData: React.Dispatch<React.SetStateAction<ISignUpData>>;
  signUpData: ISignUpData;
}

export interface IFinalSignUpProps {
  signUpData: ISignUpData; 
  setSignUpData: React.Dispatch<React.SetStateAction<ISignUpData>>
}