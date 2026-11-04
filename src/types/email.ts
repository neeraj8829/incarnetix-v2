export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  service?: string;
}

export interface EmailJSResponse {
  status: number;
  text: string;
}

export interface EmailTemplateParams extends Record<string, unknown> {
  from_name: string;
  from_email: string;
  phone?: string;
  message: string;
  to_email: string;
  timestamp: string;
  service?: string;
}

