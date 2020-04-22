import amber from "@material-ui/core/colors/amber";
import green from "@material-ui/core/colors/green";

import { IconButton, Snackbar, SnackbarContent, withStyles } from "@material-ui/core";

import { CheckCircle, Close, Error, Info, Warning } from "@material-ui/icons";

import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

const variantIcon = {
    success: CheckCircle,
    warning: Warning,
    error: Error,
    info: Info
};

const styles1 = theme => ({
    success: {
        backgroundColor: green[600]
    },
    error: {
        backgroundColor: theme.palette.error.dark
    },
    info: {
        backgroundColor: theme.palette.primary.dark
    },
    warning: {
        backgroundColor: amber[700]
    },
    icon: {
        fontSize: 30
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing.unit
    },
    message: {
        display: "flex",
        alignItems: "center",
        fontSize: 15
    }
});

function MySnackbarContent(props) {
    const { classes, className, message, onClose, variant, ...other } = props;
    const Icon = variantIcon[variant];

    return (
        <SnackbarContent
            className={classNames(classes[variant], className)}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={classes.message}>
                    <Icon className={classNames(classes.icon, classes.iconVariant)} />
                    {message}
                </span>
            }
            action={[
                <Icon key="close" aria-label="Close" color="inherit" className={classes.close} onClick={onClose} > <Close className={classes.icon} /> </Icon>
            ]}
            {...other}
        />
    );
}

MySnackbarContent.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    message: PropTypes.node,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(["success", "warning", "error", "info"]).isRequired
};

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

const styles2 = theme => ({
    margin: {
        margin: theme.spacing.unit
    }
});

class SnackbarToast extends React.Component {
    state = {
        open: false
    };

    handleClick = () => {
        this.setState({ open: true });
    };

    handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        this.setState({ open: false });
    };

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Snackbar anchorOrigin={{ vertical: "bottom", horizontal: "right" }} open={this.props.open} autoHideDuration={4000} onClose={() => this.props.handleToastClose()} >
                    <MySnackbarContentWrapper onClose={() => this.props.handleToastClose()} variant={this.props.variant} message={this.props.message} />
                </Snackbar>
            </div>
        );
    }
}

SnackbarToast.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles2)(SnackbarToast);
