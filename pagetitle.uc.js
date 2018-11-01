(function () {
    if (location != 'chrome://browser/content/browser.xul')
        return;
    try {
        CustomizableUI.createWidget({
            id: 'pagetitle-bar',
            type: 'custom',
            defaultArea: CustomizableUI.AREA_NAVBAR,
            onBuild: function (aDocument) {
                var toolbaritem = aDocument.createElementNS('http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul', 'toolbaritem');
                var props = {
                    id: 'pagetitle-bar',
                    class: 'chromeclass-toolbar-additional',
                    align: 'center'
                };
                for (var p in props)
                    toolbaritem.setAttribute(p, props[p]);
                return toolbaritem;
            }
        });
    } catch (e) {};
    setInterval(function () {
        var mainwindow = document.getElementById('main-window');
        var pageTitle = mainwindow.getAttribute('title');
        var pageTitleBar = document.getElementById("pagetitle-bar");
        pageTitleBar.setAttribute("titlepage", pageTitle);
    }, 0);
})();