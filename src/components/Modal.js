// @flow
import * as React from 'react';
import ReactModal from 'react-modal';
import Button from 'components/Button';
import { FiX } from 'react-icons/fi';
import { ClassNames } from '@emotion/core';
import styled from '@emotion/styled';
import colors from 'theme/colors';
import { spacing } from 'theme/sizes';

ReactModal.setAppElement('#root');

type Props = {
  isOpen: boolean,
  withCloseButton: boolean,
  close: () => void,
  children: () => React.Node,
  renderFooter: () => React.Node,
  renderHeader: () => React.Node,
};

const Header = styled.header`
  padding: ${props => props.withClose ? spacing(2, 1, 2, 3) : spacing(3)};
  border-bottom: 1px solid ${colors.borders.main};
  display: flex;
  align-items: center;
`;

const HeaderContent = styled.div`
  flex: 1 0 0;
  margin-right: ${spacing(2)};
`;

const Content = styled.div`
  padding: ${spacing(3)};
`;

const Footer = styled.footer`
  padding: ${spacing(3)};
  border-top: 1px solid ${colors.borders.main};
`;

const StyledReactModal = styled(ReactModal)`
  width: calc(100% - 30px);
  min-height: 100px;
`;

const modalStyles = {
  ...ReactModal.defaultStyles,
  overlay: {
    ...ReactModal.defaultStyles.overlay,
    backgroundColor: 'rgba(4,36,69,0.85)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    ...ReactModal.defaultStyles.content,
    border: `1px solid ${colors.borders.main}`,
    position: 'static',
    padding: 0,
  },
};

export default function Modal({ isOpen, withCloseButton, close, children, renderFooter, renderHeader }: Props) {
  const [canRender, setCanRender] = React.useState(false);

  React.useEffect(() => {
    if (isOpen && !canRender) setCanRender(true);
  }, [isOpen]);

  React.useLayoutEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    if (isOpen) document.body.style.overflow = 'hidden';
    return () => {
      if (isOpen) document.body.style.overflow = originalStyle;
    };
  }, [isOpen]); // Empty array ensures effect is only run on mount and unmount

  const closeAndStopRender = () => {
    close();
    setTimeout(() => setCanRender(false), 250);
  };

  const renderContent = () => {
    const header = renderHeader();
    const footer = renderFooter();
    return (
      <>
        {(header !== null || withCloseButton) && (
          <Header withClose={withCloseButton}>
            <HeaderContent>{header}</HeaderContent>
            {withCloseButton && <Button icon={<FiX />} size="large" type="tertiary" onClick={close} />}
          </Header>
        )}
        <Content>
          {children()}
        </Content>
        {footer !== null && <Footer>{footer}</Footer>}
      </>
    );
  };

  return (
    <ClassNames>
      {({ css, cx }) => (
        <StyledReactModal
          isOpen={isOpen}
          onRequestClose={close}
          style={modalStyles}
          closeTimeoutMS={250}
          shouldCloseOnOverlayClick
          overlayClassName={{
            base: css`
              opacity: 0;
              transition: opacity 150ms;
            `,
            afterOpen: css`opacity: 1;`,
            beforeClose: css`opacity: 0;`,
          }}
        >
          {canRender && renderContent()}
        </StyledReactModal>
      )}
    </ClassNames>
  );
}
Modal.defaultProps = {
  isOpen: false,
  withCloseButton: false,
  renderHeader: () => null,
  renderFooter: () => null,
};
