(function() {
	if(location != 'chrome://browser/content/browser.xul')
        return;

	try {
		CustomizableUI.createWidget({
			id: 'restart-button',
			type: 'custom',
			defaultArea: CustomizableUI.AREA_NAVBAR,
			onBuild: function(aDocument) {
				var toolbaritem = aDocument.createElementNS('http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul', 'toolbarbutton');
                toolbaritem.onclick = event => onClick(event);
				var props = {
					id: 'restart-button',
					class: 'toolbarbutton-1 chromeclass-toolbar-additional',
					label: 'Restart',
					tooltiptext: 'Restart (with middle click userChrome.js cache is emptied)',
					style: 'list-style-image: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ5MS4yMzYgNDkxLjIzNiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDkxLjIzNiA0OTEuMjM2OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCI+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTU1Ljg5LDI2Mi44MThjLTMtMjYtMC41LTUxLjEsNi4zLTc0LjNjMjIuNi03Ny4xLDkzLjUtMTMzLjgsMTc3LjYtMTM0Ljh2LTUwLjRjMC0yLjgsMy41LTQuMyw1LjgtMi42bDEwMy43LDc2LjIgICAgYzEuNywxLjMsMS43LDMuOSwwLDUuMWwtMTAzLjYsNzYuMmMtMi40LDEuNy01LjgsMC4yLTUuOC0yLjZ2LTUwLjNjLTU1LjMsMC45LTEwMi41LDM1LTEyMi44LDgzLjJjLTcuNywxOC4yLTExLjYsMzguMy0xMC41LDU5LjQgICAgYzEuNSwyOSwxMi40LDU1LjcsMjkuNiw3Ny4zYzkuMiwxMS41LDcsMjguMy00LjksMzdjLTExLjMsOC4zLTI3LjEsNi0zNS44LTVDNzQuMTksMzMwLjYxOCw1OS45OSwyOTguMjE4LDU1Ljg5LDI2Mi44MTh6ICAgICBNMzU1LjI5LDE2Ni4wMThjMTcuMywyMS41LDI4LjIsNDguMywyOS42LDc3LjNjMS4xLDIxLjItMi45LDQxLjMtMTAuNSw1OS40Yy0yMC4zLDQ4LjItNjcuNSw4Mi40LTEyMi44LDgzLjJ2LTUwLjMgICAgYzAtMi44LTMuNS00LjMtNS44LTIuNmwtMTAzLjcsNzYuMmMtMS43LDEuMy0xLjcsMy45LDAsNS4xbDEwMy42LDc2LjJjMi40LDEuNyw1LjgsMC4yLDUuOC0yLjZ2LTUwLjQgICAgYzg0LjEtMC45LDE1NS4xLTU3LjYsMTc3LjYtMTM0LjhjNi44LTIzLjIsOS4yLTQ4LjMsNi4zLTc0LjNjLTQtMzUuNC0xOC4yLTY3LjgtMzkuNS05NC40Yy04LjgtMTEtMjQuNS0xMy4zLTM1LjgtNSAgICBDMzQ4LjI5LDEzNy43MTgsMzQ2LjA5LDE1NC41MTgsMzU1LjI5LDE2Ni4wMTh6IiBmaWxsPSIjMWU5MGZmIi8+Cgk8L2c+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==)'
                };
				for(var p in props)
					toolbaritem.setAttribute(p, props[p]);
				return toolbaritem;
			}
		});
	} catch(e) {};

    function onClick(event) {
        if(event.button == 1)
            Services.appinfo.invalidateCachesOnRestart();
        else if(event.button == 2)
            return;

        let cancelQuit = Cc["@mozilla.org/supports-PRBool;1"].createInstance(Ci.nsISupportsPRBool);
        Services.obs.notifyObservers(cancelQuit, "quit-application-requested", "restart");
        if(!cancelQuit.data)
            Services.startup.quit(Services.startup.eAttemptQuit | Services.startup.eRestart);
    }
})();
