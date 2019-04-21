// // @flow
// import * as React from 'react';
// import classNames from 'classnames';
// import debounce from 'debounce';
// import { findDOMNode } from 'react-dom';
// import CSSModules from 'react-css-modules';
// import DivFlavoredButton from 'lib/components/DivFlavoredButton';
// import Portal from 'lib/components/Portal';
// import ClickOwnerOutside from 'lib/components/ClickOwnerOutside';
// import { contains } from 'lib/helpers/dom';
// import shouldStateUpdate from 'lib/helpers/shouldStateUpdate';
// import withSlots from 'lib/hocs/withSlots';

// import { type ClickableTriggerProps, type HoverableTriggerProps, type Placement, type PopoverTriggerContext } from './types';
// import findFit from './findFit';

// import styles from './styles.sass';

// type Props = {
//   childrenToggle: boolean,
//   hoverable: boolean,
//   withDomTrigger: boolean,
//   children?: React.Node,
//   body: () => React.Node,
//   innerRef: (popover?: Popover) => void,
//   trigger: (popoverTriggerContext: PopoverTriggerContext) => React.Node,
//   onToggle?: () => {},
//   placement?: Placement,
// };

// type State = {
//   arrowPosition: number,
//   isOpen: boolean,
//   isTransitioning: boolean,
//   left: number,
//   placement: Placement,
//   top: number,
// };

// @withSlots(['body', 'trigger'])
// @CSSModules(styles, { allowMultiple: true })
// export default class Popover extends React.Component<Props, State> {
//   static defaultProps = {
//     childrenToggle: false,
//     hoverable: false,
//     innerRef: () => {},
//     withDomTrigger: false,
//     onToggle: () => {},
//     placement: 'bottom',
//   };

//   constructor(props: Props) {
//     super(props);

//     this.state = {
//       arrowPosition: 0,
//       isOpen: false,
//       isTransitioning: false,
//       left: 0,
//       placement: props.placement,
//       top: 0,
//     };

//     this.debouncedRecalculatePosition = debounce(this.recalculatePosition, 50);
//   }

//   componentDidMount() {
//     this.props.innerRef(this);
//     if (window) window.addEventListener('resize', this.debouncedRecalculatePosition);
//     this.recalculatePosition();
//   }

//   componentDidUpdate() {
//     this.recalculatePosition();
//   }

//   componentWillUnmount() {
//     this.props.innerRef(undefined);
//     if (window) window.removeEventListener('resize', this.debouncedRecalculatePosition);
//   }

//   /**
//    * shouldPortalBeInDOM - defines if we need to mount the popover portal
//    *
//    * @returns {boolean}
//    */
//   get shouldPortalBeInDOM(): boolean {
//     return this.state.isOpen || this.state.isTransitioning;
//   }

//   get clickableTriggerProps(): ClickableTriggerProps {
//     return {
//       onClick: this.handleOpen,
//       ref: this.refFn,
//     };
//   }

//   get hoverableTriggerProps(): HoverableTriggerProps {
//     return {
//       onMouseEnter: this.handleOpen,
//       onMouseLeave: this.handleClose,
//       ref: this.refFn,
//     };
//   }

//   get popoverTriggerContext(): PopoverTriggerContext {
//     return {
//       isOpen: this.state.isOpen,
//       triggerProps: this.props.hoverable ? this.hoverableTriggerProps : this.clickableTriggerProps,
//     };
//   }

//   wrapper: ?HTMLElement = null;
//   popover: ?HTMLDivElement = null;
//   debouncedRecalculatePosition = () => {};

//   /**
//    * This method is accessible from consuming components: calling this will open the popover with the event target as the trigger element
//    */
//   handleDomMouseOver = (evt: SyntheticMouseEvent<HTMLElement>) => {
//     this.wrapper = evt.target;
//     this.handleOpen();
//   };

//   /**
//    * This method is accessible from consuming components: calling this will close the popover
//    */
//   handleDomMouseOut = (evt: SyntheticMouseEvent<HTMLElement>) => {
//     this.handleClose(evt);
//   };

//   handleMouseLeavePopover = (evt: SyntheticMouseEvent<HTMLDivElement>) => {
//     if (this.props.hoverable && !contains(findDOMNode(this), evt.relatedTarget)) this.toggle(false);
//   };

//   handleOpen = () => {
//     if (!this.state.isOpen) {
//       this.toggle(true);
//     } else if (this.props.childrenToggle) {
//       this.toggle(false);
//     }
//   };

//   handleClose = (evt: SyntheticMouseEvent<HTMLDivElement>) => {
//     const { hoverable } = this.props;
//     const container = hoverable ? this.popover : findDOMNode(this);
//     const containee = hoverable ? evt.relatedTarget : evt.target;

//     if (!contains(container, containee)) this.toggle(false);
//   };

//   handleTransitionEnd = (): void => this.setState({ isTransitioning: false });

//   refFn = (ref: HTMLElement) => {
//     this.wrapper = findDOMNode(ref);
//   };

//   /**
//    * toggle - shows/closes the popup as well as handles all the associated routines
//    *
//    * @param {boolean} [isOpen=false]
//    *
//    * @returns {void}
//    */
//   toggle(isOpen: boolean = false) {
//     if (this.state.isOpen !== isOpen) {
//       this.setState({ isTransitioning: true }, () => {
//         // adds the element to the DOM
//         this.setState(
//           { isOpen },
//           (): * => {
//             // sets the proper state
//             this.props.onToggle(isOpen); // triggers the event
//           }
//         );
//       });
//     }
//   }

//   /**
//    * recalculatePosition - makes sure the popover is at the right place
//    *
//    * @returns {void}
//    */
//   recalculatePosition = () => {
//     if (this.popover && this.wrapper) {
//       const { placement, position, arrowPosition } = findFit(
//         this.wrapper.getBoundingClientRect(),
//         this.popover.getBoundingClientRect(),
//         this.wrapper && this.wrapper.ownerDocument
//       );
//       const { top, left } = position;
//       const newState = { placement, top, left, arrowPosition };

//       if (shouldStateUpdate(this.state, newState)) this.setState(newState);
//     }
//   };

//   renderPopover(): React.Node {
//     const { placement, top, left, arrowPosition, isOpen } = this.state;
//     const popover = (
//       <div
//         style={{ top, left }}
//         className={classNames(styles.Popover, styles[`Popover_${placement}`], isOpen && styles.Popover_open)}
//         ref={ref => (this.popover = ref)}
//         onAnimationStart={this.handleTransitionStart}
//         onTransitionEnd={this.handleTransitionEnd}
//         onMouseLeave={this.handleMouseLeavePopover}
//       >
//         <div className={styles.Popover__arrow} style={{ left: arrowPosition }} />
//         <div className={styles.Popover__body}>{this.props.body()}</div>
//       </div>
//     );

//     return this.props.hoverable ? popover : <ClickOwnerOutside onClickOutside={this.handleClose}>{popover}</ClickOwnerOutside>;
//   }

//   render(): React.Node {
//     const { shouldPortalBeInDOM } = this;
//     const { children, trigger, withDomTrigger } = this.props;

//     return (
//       <div styleName={classNames('Popover__wrapper', withDomTrigger && 'Popover__wrapper_hidden')}>
//         {!withDomTrigger &&
//           (trigger(this.popoverTriggerContext) || (
//             <DivFlavoredButton data-role="trigger" styleName="Popover__trigger" {...this.popoverTriggerContext.triggerProps}>
//               {children}
//             </DivFlavoredButton>
//           ))}

//         {shouldPortalBeInDOM && <Portal>{this.renderPopover()}</Portal>}
//       </div>
//     );
//   }
// }
