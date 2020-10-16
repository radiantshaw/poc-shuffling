import React from "react";

function getPropsToForward(props, _this) {
  const forwardedProps = { ...props };
  forwardedProps.name = _this.prefix + '[' + props.attribute + ']';
  delete forwardedProps.attribute;
  if (props.collection) {
    forwardedProps.name += "[]";
    delete forwardedProps.collection;
  }

  return forwardedProps;
}

function input(props) {
  return <input { ...getPropsToForward(props, this) } />;
}

function select(props) {
  return (
    <select { ...getPropsToForward(props, this) }>
      { props.children }
    </select>
  );
}

function textarea(props) {
  return <textarea { ...getPropsToForward(props, this) } />;
}

function label(props) {
  return <label></label>
}

function FormBuilder(prefix) {
  Object.defineProperty(this, "prefix", {
    get: function() {
      return prefix;
    }
  });

  Object.defineProperties(this, {
    input: {
      get: function() {
        return input.bind(this);
      }
    },
    select: {
      get: function() {
        return select.bind(this);
      }
    },
    textarea: {
      get: function() {
        return textarea.bind(this);
      }
    }
  });
}

function form(props) {
  if (!props.entity) {
    throw new Error("`entity' prop not passed to form builder");
  }

  const forwardedProps = { ...props };
  delete forwardedProps.entity;

  return (
    <form { ...forwardedProps }>
      { props.children && props.children(new FormBuilder(props.entity)) }
    </form>
  );
}

export default {
  form: form
};
