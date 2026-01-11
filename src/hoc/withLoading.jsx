import React from "react";

const withLoading = (WrappedComponent) => {
  return function WithLoadingComponent({ isLoading, ...props }) {
    if (isLoading) {
      return <div>Đang tải...</div>;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withLoading;
