<?php

// This file has been auto-generated by the Symfony Dependency Injection Component for internal use.

if (\class_exists(\ContainerQExq47M\App_KernelDevDebugContainer::class, false)) {
    // no-op
} elseif (!include __DIR__.'/ContainerQExq47M/App_KernelDevDebugContainer.php') {
    touch(__DIR__.'/ContainerQExq47M.legacy');

    return;
}

if (!\class_exists(App_KernelDevDebugContainer::class, false)) {
    \class_alias(\ContainerQExq47M\App_KernelDevDebugContainer::class, App_KernelDevDebugContainer::class, false);
}

return new \ContainerQExq47M\App_KernelDevDebugContainer([
    'container.build_hash' => 'QExq47M',
    'container.build_id' => 'c7420b9a',
    'container.build_time' => 1719301629,
], __DIR__.\DIRECTORY_SEPARATOR.'ContainerQExq47M');
