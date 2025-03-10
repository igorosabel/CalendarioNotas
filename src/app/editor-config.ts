import { AngularEditorConfig } from '@kolkov/angular-editor';

const editorConfig: AngularEditorConfig = {
  editable: true,
  spellcheck: false,
  height: 'auto',
  minHeight: '200px',
  maxHeight: 'auto',
  width: 'auto',
  minWidth: '0',
  translate: 'no',
  enableToolbar: true,
  showToolbar: true,
  placeholder: 'Escribe la entrada aquí...',
  defaultParagraphSeparator: '',
  defaultFontName: 'arial',
  defaultFontSize: '',
  fonts: [
    { class: 'arial', name: 'Arial' },
    { class: 'times-new-roman', name: 'Times New Roman' },
    { class: 'calibri', name: 'Calibri' },
  ],
  sanitize: true,
  toolbarPosition: 'top',
  toolbarHiddenButtons: [
    [
      'justifyLeft',
      'justifyCenter',
      'justifyRight',
      'justifyFull',
      'indent',
      'outdent',
    ],
    [
      'fontSize',
      'customClasses',
      'insertImage',
      'insertVideo',
      'toggleEditorMode',
    ],
  ],
};
export default editorConfig;
