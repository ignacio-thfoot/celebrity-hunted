    <?php if(constant("IS_VIRTUAL_ENV")): ?>
        <script src="http://localhost:9000/app_common.bundle.js" type="text/javascript"></script>
        <script src="http://localhost:9000/lt_common.bundle.js" type="text/javascript"></script>
        <script id="__bs_script__">//<![CDATA[
        document.write("<script async src='http://HOST:3000/browser-sync/browser-sync-client.js?v=2.26.7'><\/script>".replace("HOST", location.hostname));
    //]]></script>
    <?php else: ?>
        <script src="js/frontend/app_common.js" type="text/javascript"></script>
        <script src="js/frontend/lt_common.js" type="text/javascript"></script>
    <?php endif; ?>
</body>
</html>