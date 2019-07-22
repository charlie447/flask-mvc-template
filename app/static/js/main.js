



function singleUpload(isTrigger, fileTargetID, dom) {
    const flow = new Flow({
        target: '/',
        query: {},
        singleFile: true,
        generateUniqueIdentifier: file  => {
            const d = new Date();
            return d + '-' + file.name;
        }
    });
    // Flow.js isn't supported, fall back on a different method
    if (!flow.support) location.href = '/some-old-crappy-uploader';

    flow.assignBrowse($(fileTargetID));
    flow.assignDrop($(fileTargetID));

    flow.on('fileAdded', (file, event) => {
        console.log(file, event);
        // $('.upload-box .upload-drop').addClass('hidden');
        $(dom + ' .upload-success').removeClass('hidden');

        const fileFullName = file.name;
        const flagIdx = fileFullName.lastIndexOf('.');
        const fileType = fileFullName.substring(flagIdx + 1);
        const fileName = fileFullName.substring(0, flagIdx);
        const uploadSuccess = $(
            `<div class="upload-success">
                <span class="icon-span-lg ft-wrapper"><i class="fileType"></i></span>
                <span class="fileSpan">
                    <span class="fileName"></span>
                    <span class="fileSize"></span>
                </span>
                <div class="progress hidden">
                    <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                    </div>
                </div>
                <span class="date hidden"></span>
                <span class="icon-wrapper">
                    <i class="appkiticon icon-outline-circle-delete tooltip-link" title="" data-placement="top" data-toggle="tooltip" data-original-title="Delete" data-container="body"></i>
                </span>
            </div>`
        );
        const uploadError = $(
            `<div class="upload-error hidden">
                <span class="label label-danger">Error</span>
                <span class="message"></span>
                <span class="icon-wrapper">
                    <i class="appkiticon icon-outline-refresh tooltip-link" title="" data-placement="top" data-toggle="tooltip" data-original-title="Retry" data-container="body"></i>
                    <i class="appkiticon icon-outline-circle-delete tooltip-link" title="" data-placement="top" data-toggle="tooltip" data-original-title="Delete" data-container="body"></i>
                </span>
            </div>`
        );

        $(dom + ' .upload-success').replaceWith(uploadSuccess);
        $(dom + ' .upload-error').replaceWith(uploadError);
        $(dom + ' i.icon-outline-circle-delete').on('click', () => {
            flow.cancel();
            $(dom + ' .upload-success').addClass('hidden');
            $(dom + ' .upload-error').addClass('hidden');
        });
        let iconType = 'file';
        if (fileType === 'pdf') {
            iconType = fileType;
        } else if (fileType === 'xlsx' || fileType === 'xls') {
            iconType = 'xls';
        } else if (fileType === 'docx' || fileType === 'doc') {
            iconType = 'doc';
        } else if (fileType === 'pptx' || fileType === 'ppt') {
            iconType = 'ppt';
        }

        const iconClass = 'fileType appkiticon icon-fill-' + iconType;
        $(dom + ' .upload-success i.fileType').removeClass();
        $(dom + ' .upload-success .ft-wrapper i:first-child').addClass(iconClass);
        $(dom + ' .upload-success span.fileName').html(fileName);
        $(dom + ' .upload-success span.fileName').attr('title', fileName);
        $('.upload-box [data-toggle="tooltip"]').tooltip();
    });

    flow.on('filesSubmitted', (file, event) => {
        if (!isTrigger) {
            $(dom + ' .upload-success .progress').removeClass('hidden');
            flow.upload();
        }
    });

    if (isTrigger) {
        $(dom + ' .button').on('click', () => {
            $(dom + ' .upload-success .progress').removeClass('hidden');
            flow.upload();
        });
    }

    flow.on('fileProgress', file => {
        const progressSize = file.progress() * 100 + '%';
        $(dom + ' .upload-success .progress-bar').css('width', progressSize);
    });

    flow.on('complete', () => {
        const date = moment().format('MMM DD,YYYY');
        setTimeout(() => {
            $(dom + ' .upload-success .progress').addClass('hidden');
            $(dom + ' .upload-success span.date').removeClass('hidden');
            $(dom + ' .upload-success span.date').html(date);
            $(dom + ' .upload-success i.icon-outline-circle-delete').toggleClass(
                'icon-outline-circle-delete icon-outline-delete');
        }, 500);
        $('.upload-box [data-toggle="tooltip"]').tooltip();
    });

    flow.on('fileSuccess', (file, message) => {
        const fileSizeMB = (file.size / 1024 / 1024).toFixed(1);
        const fileSizeKB = (file.size / 1024).toFixed(1);
        let fileSize;
        if (fileSizeMB < 1) {
            fileSize = fileSizeKB + 'KB';
        } else {
            fileSize = fileSizeMB + 'MB';
        }
        $(dom + ' .upload-success span.fileSize').html(fileSize);
        setTimeout(() => {
            $(dom + 'i.icon-outline-delete').on('click', () => {
                flow.removeFile(file);
                $(dom + ' .upload-success').addClass('hidden');
                $(dom + ' .upload-error').addClass('hidden');
            });
        }, 600);
        $('.upload-box [data-toggle="tooltip"]').tooltip();
    });

    flow.on('fileError', (file, message) => {
        const errorMessage = 'Failed to upload file “' + file.name + '”';
        $(dom + ' .upload-success').addClass('hidden');
        $(dom + ' .upload-error').removeClass('hidden');
        $(dom + ' .upload-error span.message').html(errorMessage);

        $(dom + ' i.icon-outline-circle-delete').on('click', () => {
            flow.resume();
        });
        $('.upload-box [data-toggle="tooltip"]').tooltip();
    });

    $(dom + ' i.icon-outline-circle-delete').on('click', () => {
        flow.cancel();
        $(dom + ' .upload-success').addClass('hidden');
        $(dom + ' .upload-error').addClass('hidden');
    });
}
        