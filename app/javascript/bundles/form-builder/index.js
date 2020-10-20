import React, { createContext, useContext } from "react";

const FormContext = createContext();

function useDerivedNameFor(name, collection) {
  const names = useContext(FormContext);
  let derivedName =
    [...names, name].slice(1)
      .reduce(function(derivedName, name) {
        return derivedName + '[' + name + ']';
      }, names[0]);

  if (collection) {
    derivedName += "[]";
  }

  return derivedName;
}

function form(props) {
  const propsCopy = { ...props };
  delete propsCopy.name;

  return (
    <form { ...propsCopy }>
      <FormContext.Provider value={[props.name]}>
        { props.children }
      </FormContext.Provider>
    </form>
  );
}

function fieldsFor(props) {
  let formName = props.formName || useContext(FormContext);

  if (!formName) {
    throw new Error(`
      No form name specified. Either use a root \`builder.form' and pass
      a \`name' prop to it. Or if the form is rendered from the server,
      then just specify the \`formName' prop to \`builder.fieldsFor'.
    `);
  }

  const names = [formName];
  names.push(props.name);
  if (props.collection) {
    names.push('');
  }

  return (
    <FormContext.Provider value={names}>
      { props.children }
    </FormContext.Provider>
  );
}

function input(props) {
  const propsCopy = { ...props };
  const derivedName = useDerivedNameFor(props.name, props.collection);
  delete propsCopy.collection;

  return <input { ...propsCopy } name={derivedName} />;
}

export default {
  form: form,
  input: input,
  fieldsFor: fieldsFor
};
