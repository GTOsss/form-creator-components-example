// /* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { SyntheticEvent, useCallback, useRef } from 'react';
import { Controller } from 'effector-react-form';
import cn from 'clsx';

// aliases: инпут, текстовоеПоле

type PublicProps = {
  className?: string; // класс, class, класснейм
  classNameInput?: string; // классИнпут
  classNamePrefix?: string; // классПрефикс
  classNameFieldSet?: string;
  label?: string; // лейбл
  autoComplete?: string; // автоКомпит
  size?: 'sm' | 'md' | 'lg'; // размер
  placeholder?: string; // плейсхолдер
  prefix?: React.ReactNode; // префикс
  type?: 'text' | 'password' | 'number'; // тип
  isVisibleControls?: boolean; // видимыйКонтроль
};

type Props = PublicProps & {
  controller: Controller;
  ref?: React.Ref<any>;
  onKeyUp?: (e: SyntheticEvent) => void;
  onBlur?: (e: SyntheticEvent) => void;
};

const Input: React.FC<Props> = React.forwardRef(function Input(
  {
    controller,
    className,
    classNameInput,
    classNamePrefix,
    classNameFieldSet,
    label,
    autoComplete = 'on',
    size = 'md',
    placeholder,
    prefix,
    type = 'text',
    isVisibleControls,
    onKeyUp,
    onBlur,
  },
  ref,
) {
  const {
    input,
    fieldState: { active },
    error,
    isShowError,
  } = controller();

  const refInput = useRef<any>();

  React.useImperativeHandle(
    ref,
    () => ({
      focus: () => {
        refInput.current.focus();
      },
    }),
    [],
  );

  const setFocus = () => {
    refInput.current.focus();
  };

  const innerOnBlur = useCallback(
    (e) => {
      if (onBlur) {
        onBlur(e);
      }

      input.onBlur(e);
    },
    [onBlur],
  );

  return (
    <div className={cn('input__wrap', className)}>
      <div
        className={cn(
          'input__wrapInput',
          {
            ['focus']: active,
            ['active']: active || input.value,
            ['input__error']: isShowError,
            ['input__labelUpper']: Boolean(placeholder && label),
          },
          [`size_${size}`],
        )}
      >
        {prefix && (
          <span onClick={setFocus} className={classNamePrefix}>
            {prefix}
          </span>
        )}

        {label && (
          <span onClick={setFocus} className="label">
            {label}
          </span>
        )}

        <input
          {...input}
          value={input.value || ''}
          autoComplete={autoComplete}
          type={type}
          ref={refInput}
          className={cn(classNameInput, 'input__input', { ['input__isVisibleControls']: isVisibleControls })}
          placeholder={placeholder}
          onKeyUp={onKeyUp}
          onBlur={innerOnBlur}
        />
        <fieldset aria-hidden className={cn('input__fieldset', classNameFieldSet)}>
          <legend className="legendElement">
            {label && <span className="input__legendInnerElement">{label}</span>}
          </legend>
        </fieldset>
      </div>

      {isShowError && <div className="errorMessage">{error}</div>}
    </div>
  );
});

export default React.memo(Input);
