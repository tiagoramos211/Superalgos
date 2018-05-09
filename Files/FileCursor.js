﻿
function newFileCursor() {

    const MODULE_NAME = "File Cursor";
    const INFO_LOG = false;
    const ERROR_LOG = true;
    const logger = newDebugLog();
    logger.fileName = MODULE_NAME;

    let files = new Map;
    let cursorDate;

    let thisObject = {
        setDatetime: setDatetime,
        setTimePeriod: setTimePeriod,
        files: undefined,
        getExpectedFiles: getExpectedFiles,
        initialize: initialize
    }

    thisObject.files = files;

    let minCursorSize = 10;
    let maxCursorSize = 30;

    let market;
    let exchange;
    let fileCloud;
    let devTeam;
    let bot;
    let thisSet;
    let periodName;
    let timePeriod;
    let beginDateRange;
    let endDateRange;

    return thisObject;

    function initialize(pFileCloud, pDevTeam, pBot, pSet, pExchange, pMarket, pPeriodName, pTimePeriod, pCursorDate, pCurrentTimePeriod, pBeginDateRange, pEndDateRange, callBackFunction) {

        try {

            if (INFO_LOG === true) { logger.write("[INFO] initialize -> Entering function."); }
            if (INFO_LOG === true) { logger.write("[INFO] initialize -> key = " + pDevTeam.codeName + "-" + pBot.codeName + "-" + pSet.codeName + "-" + pPeriodName); }

            market = pMarket;
            exchange = pExchange;
            fileCloud = pFileCloud;
            devTeam = pDevTeam;
            bot = pBot;
            thisSet = pSet;
            periodName = pPeriodName;
            cursorDate = pCursorDate;
            timePeriod = pTimePeriod;
            beginDateRange = pBeginDateRange;
            endDateRange = pEndDateRange;

            setTimePeriod(pCurrentTimePeriod, pCursorDate, callBackFunction);

        } catch (err) {

            if (ERROR_LOG === true) { logger.write("[ERROR] initialize -> err = " + err); }
            callBackFunction(GLOBAL.DEFAULT_FAIL_RESPONSE);
        }
    }

    function setTimePeriod(pTimePeriod, pDatetime, callBackFunction) {

        try {

            if (INFO_LOG === true) { logger.write("[INFO] setTimePeriod -> Entering function."); }

            /*
    
            We are implementing here an algorithm designed to save bandwidth, memory and processing power at the browser.
            We say there is a saving mode where the cursor is running at a minimum size. When the end user aproaches the time period the cursor
            is set, then it should exit the saving mode and go to its actual size.
    
            To do this we are going to measure the distance from the Time Period received to the one the cursors was initialized with.
            If these periods are consecutive, it means that the cursor should exit saving mode and load its full size.
    
            */

            cursorDate = pDatetime; // Adjust the cursor date to the one received.

            let positionA;

            for (let i = 0; i < dailyFilePeriods.length; i++) {

                let period = dailyFilePeriods[i];

                if (period[0] === pTimePeriod) {

                    positionA = i;

                }

                if (period[0] === timePeriod) {

                    positionB = i;

                }
            }

            if (Math.abs(positionB - positionA) <= 1) {

                exitSavingMode();
                //console.log("File Cursor with period " + periodName + " EXITED saving mode after being notified the user is at period " + convertTimePeriodToName(pTimePeriod));

            } else {

                enterSavingMode();
                //console.log("File Cursor with period " + periodName + " ENTERED saving mode after being notified the user is at period " + convertTimePeriodToName(pTimePeriod));

            }

            getFiles(callBackFunction);

            collectGarbage(callBackFunction);

            function enterSavingMode() {

                try {

                    if (INFO_LOG === true) { logger.write("[INFO] setTimePeriod -> enterSavingMode -> Entering function."); }

                    switch (timePeriod) {

                        case _45_MINUTES_IN_MILISECONDS:
                            {
                                minCursorSize = 3;
                                maxCursorSize = 30;
                            }
                            break;
                        case _40_MINUTES_IN_MILISECONDS:
                            {
                                minCursorSize = 3;
                                maxCursorSize = 20;
                            }
                            break;
                        case _30_MINUTES_IN_MILISECONDS:
                            {
                                minCursorSize = 3;
                                maxCursorSize = 15;
                            }
                            break;
                        case _20_MINUTES_IN_MILISECONDS:
                            {
                                minCursorSize = 3;
                                maxCursorSize = 15;
                            }
                            break;
                        case _15_MINUTES_IN_MILISECONDS:
                            {
                                minCursorSize = 3;
                                maxCursorSize = 15;
                            }
                            break;
                        case _10_MINUTES_IN_MILISECONDS:
                            {
                                minCursorSize = 3;
                                maxCursorSize = 15;
                            }
                            break;
                        case _5_MINUTES_IN_MILISECONDS:
                            {
                                minCursorSize = 3;
                                maxCursorSize = 15;
                            }
                            break;
                        case _4_MINUTES_IN_MILISECONDS:
                            {
                                minCursorSize = 3;
                                maxCursorSize = 15;
                            }
                            break;
                        case _3_MINUTES_IN_MILISECONDS:
                            {
                                minCursorSize = 3;
                                maxCursorSize = 15;
                            }
                            break;
                        case _2_MINUTES_IN_MILISECONDS:
                            {
                                minCursorSize = 3;
                                maxCursorSize = 15;
                            }
                            break;
                        case _1_MINUTE_IN_MILISECONDS:
                            {
                                minCursorSize = 3;
                                maxCursorSize = 15;
                            }
                            break;
                        default:
                    }

                } catch (err) {

                    if (ERROR_LOG === true) { logger.write("[ERROR] setTimePeriod -> enterSavingMode -> err = " + err); }
                    callBackFunction(GLOBAL.DEFAULT_FAIL_RESPONSE);
                }
            }

            function exitSavingMode() {

                try {

                    if (INFO_LOG === true) { logger.write("[INFO] setTimePeriod -> exitSavingMode -> Entering function."); }

                    switch (timePeriod) {

                        case _45_MINUTES_IN_MILISECONDS:
                            {
                                minCursorSize = 15;
                                maxCursorSize = 30;
                            }
                            break;
                        case _40_MINUTES_IN_MILISECONDS:
                            {
                                minCursorSize = 13;
                                maxCursorSize = 20;
                            }
                            break;
                        case _30_MINUTES_IN_MILISECONDS:
                            {
                                minCursorSize = 11;
                                maxCursorSize = 15;
                            }
                            break;
                        case _20_MINUTES_IN_MILISECONDS:
                            {
                                minCursorSize = 9;
                                maxCursorSize = 15;
                            }
                            break;
                        case _15_MINUTES_IN_MILISECONDS:
                            {
                                minCursorSize = 7;
                                maxCursorSize = 15;
                            }
                            break;
                        case _10_MINUTES_IN_MILISECONDS:
                            {
                                minCursorSize = 7;
                                maxCursorSize = 15;
                            }
                            break;
                        case _5_MINUTES_IN_MILISECONDS:
                            {
                                minCursorSize = 5;
                                maxCursorSize = 15;
                            }
                            break;
                        case _4_MINUTES_IN_MILISECONDS:
                            {
                                minCursorSize = 5;
                                maxCursorSize = 15;
                            }
                            break;
                        case _3_MINUTES_IN_MILISECONDS:
                            {
                                minCursorSize = 5;
                                maxCursorSize = 15;
                            }
                            break;
                        case _2_MINUTES_IN_MILISECONDS:
                            {
                                minCursorSize = 5;
                                maxCursorSize = 15;
                            }
                            break;
                        case _1_MINUTE_IN_MILISECONDS:
                            {
                                minCursorSize = 5;
                                maxCursorSize = 15;
                            }
                            break;
                        default:
                    }

                } catch (err) {

                    if (ERROR_LOG === true) { logger.write("[ERROR] setTimePeriod -> exitSavingMode -> err = " + err); }
                    callBackFunction(GLOBAL.DEFAULT_FAIL_RESPONSE);
                }
            }

        } catch (err) {

            if (ERROR_LOG === true) { logger.write("[ERROR] setTimePeriod -> err = " + err); }
            callBackFunction(GLOBAL.DEFAULT_FAIL_RESPONSE);
        }
    }

    function setDatetime(pDatetime, callBackFunction) {

        try {

            if (INFO_LOG === true) { logger.write("[INFO] setDatetime -> Entering function."); }

            if (pDatetime === undefined) { return; }

            cursorDate = pDatetime;

            getFiles(callBackFunction);

            collectGarbage(callBackFunction);

        } catch (err) {

            if (ERROR_LOG === true) { logger.write("[ERROR] setDatetime -> err = " + err); }
            callBackFunction(GLOBAL.DEFAULT_FAIL_RESPONSE);
        }
    }

    function getFiles(callBackFunction) {

        try {

            if (INFO_LOG === true) { logger.write("[INFO] getFiles -> Entering function."); }

            let i = 0;
            let j = 0;

            let dateString;

            getNextFile();

            function getNextFile() {

                try {

                    if (INFO_LOG === true) { logger.write("[INFO] getFiles -> getNextFile -> Entering function."); }

                    let targetDate = new Date(cursorDate);
                    targetDate.setUTCDate(targetDate.getUTCDate() + j);

                    /* Small algorith to allow load first the current date, then alternate between the most forwad and the most backwards ones. */
                    if (j === 0) { j++; }
                    else {
                        if (j < 0) {
                            j = -j;
                            j++;
                        }
                        else {
                            j = -j;
                        }
                    }

                    let compareTargetDate = new Date(targetDate.toDateString());
                    
                    if (beginDateRange !== undefined) {

                        let compareBeginDate = new Date(beginDateRange.toDateString());

                        if (compareTargetDate.valueOf() < compareBeginDate.valueOf()) {

                            if (INFO_LOG === true) { logger.write("[INFO] getFiles -> getNextFile -> compareTargetDate < compareBeginDate -> Not loading the file for this date."); }
                            if (INFO_LOG === true) { logger.write("[INFO] getFiles -> getNextFile -> compareTargetDate < compareBeginDate -> compareTargetDate = " + compareTargetDate); }
                            if (INFO_LOG === true) { logger.write("[INFO] getFiles -> getNextFile -> compareTargetDate < compareBeginDate -> compareBeginDate = " + compareBeginDate); }

                            controlLoop();
                            return;
                        }
                    }

                    if (endDateRange !== undefined) {

                        let compareEndDate = new Date(endDateRange.toDateString());

                        if (compareTargetDate.valueOf() > compareEndDate.valueOf()) {

                            if (INFO_LOG === true) { logger.write("[INFO] getFiles -> getNextFile -> compareTargetDate > compareEndDate -> Not loading the file for this date."); }
                            if (INFO_LOG === true) { logger.write("[INFO] getFiles -> getNextFile -> compareTargetDate > compareEndDate -> compareTargetDate = " + compareTargetDate); }
                            if (INFO_LOG === true) { logger.write("[INFO] getFiles -> getNextFile -> compareTargetDate > compareEndDate -> compareEndDate = " + compareEndDate); }

                            controlLoop();
                            return;
                        }
                    }

                    dateString = targetDate.getUTCFullYear() + '-' + pad(targetDate.getUTCMonth() + 1, 2) + '-' + pad(targetDate.getUTCDate(), 2);

                    let currentDay = Math.trunc((new Date()).valueOf() / (24 * 60 * 60 * 1000));
                    let targetDay = Math.trunc(targetDate.valueOf() / (24 * 60 * 60 * 1000));

                    if (targetDay > currentDay) {

                        controlLoop();

                    } else {

                        if (thisObject.files.get(dateString) === undefined) { // We dont reload files we already have. 

                            fileCloud.getFile(devTeam, bot, thisSet, exchange, market, periodName, targetDate, undefined, undefined, onFileReceived);

                        } else {

                            controlLoop();
                        }

                    }

                } catch (err) {

                    if (ERROR_LOG === true) { logger.write("[ERROR] getFiles -> getNextFile -> err = " + err); }
                    callBackFunction(GLOBAL.DEFAULT_FAIL_RESPONSE);
                }
            }

            function onFileReceived(err, file) {

                try {

                    if (INFO_LOG === true) { logger.write("[INFO] getFiles -> onFileReceived -> Entering function."); }

                    switch (err.result) {
                        case GLOBAL.DEFAULT_OK_RESPONSE.result: {

                            if (INFO_LOG === true) { logger.write("[INFO] getFiles -> onFileReceived -> Received OK Response."); }
                            break;
                        }

                        case GLOBAL.DEFAULT_FAIL_RESPONSE.result: {

                            if (INFO_LOG === true) { logger.write("[INFO] getFiles -> onFileReceived -> Received FAIL Response."); }
                            callBackFunction(GLOBAL.DEFAULT_FAIL_RESPONSE);
                            return;
                        }

                        case GLOBAL.CUSTOM_FAIL_RESPONSE.result: {

                            if (INFO_LOG === true) { logger.write("[INFO] getFiles -> onFileReceived -> Received CUSTOM FAIL Response."); }
                            if (INFO_LOG === true) { logger.write("[INFO] getFiles -> onFileReceived -> err.message = " + err.message); }

                            if (err.message === "File does not exist.") {

                                controlLoop();
                                return;

                            } else {

                                callBackFunction(err);
                                return;
                            }

                        }

                        default: {

                            if (INFO_LOG === true) { logger.write("[INFO] initialize -> onFileReceived -> Received Unexpected Response."); }
                            callBackFunction(err);
                            return;
                        }
                    }

                    thisObject.files.set(dateString, file);

                    controlLoop();

                } catch (err) {

                    if (ERROR_LOG === true) { logger.write("[ERROR] getFiles -> onFileReceived -> err = " + err); }
                    callBackFunction(GLOBAL.DEFAULT_FAIL_RESPONSE);
                }
            }

            function controlLoop() {

                try {

                    if (INFO_LOG === true) { logger.write("[INFO] getFiles -> controlLoop -> Entering function."); }

                    if (callBackFunction !== undefined) {

                        callBackFunction(GLOBAL.DEFAULT_OK_RESPONSE);

                    }

                    i++;

                    if (i < minCursorSize) {

                        getNextFile();

                    }

                } catch (err) {

                    if (ERROR_LOG === true) { logger.write("[ERROR] getFiles -> controlLoop -> err = " + err); }
                    callBackFunction(GLOBAL.DEFAULT_FAIL_RESPONSE);
                }
            }

        } catch (err) {

            if (ERROR_LOG === true) { logger.write("[ERROR] getFiles -> err = " + err); }
            callBackFunction(GLOBAL.DEFAULT_FAIL_RESPONSE);
        }
    }

    function collectGarbage(callBackFunction) {

        try {

            if (INFO_LOG === true) { logger.write("[INFO] collectGarbage -> Entering function."); }

            date = removeTime(cursorDate);

            let minDate = date.valueOf() - maxCursorSize * ONE_DAY_IN_MILISECONDS / 2;
            let maxDate = date.valueOf() + maxCursorSize * ONE_DAY_IN_MILISECONDS / 2;

            for (let key of thisObject.files.keys()) {

                let keyDate = new Date(key);

                if (keyDate.valueOf() < minDate || keyDate.valueOf() > maxDate) {

                    thisObject.files.delete(key);

                }
            }

        } catch (err) {

            if (ERROR_LOG === true) { logger.write("[ERROR] collectGarbage -> err = " + err); }
            callBackFunction(GLOBAL.DEFAULT_FAIL_RESPONSE);
        }

    }

    function getExpectedFiles() {

        if (INFO_LOG === true) { logger.write("[INFO] getExpectedFiles -> Entering function."); }

        return minCursorSize;

    }

}