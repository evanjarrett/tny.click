<?php

define("IMAGE_LOCATION", "i/");
define("FILE_LOCATION", "f/");
define("URL", "https://tny.click/");
define("API_ID", "");
define("API_KEY", "");

/**
 * Resizes the image to the specified MAX_WIDTH.
 *
 * @param resource $image
 * @param string $file_name
 * @param int $width
 * @param int $height
 */
function resizeImage($image, $file_name, $width, $height) {
    $img_file = IMAGE_LOCATION . $file_name;
    $tmp = imagecreatetruecolor($width, $height);
    imagecopyresampled($tmp, $image, 0, 0, 0, 0, $width, $height, $width, $height);
    imagejpeg($tmp, $img_file, 100);
    imagedestroy($image);
    imagedestroy($tmp);
}

/**
 * Uploads the file to the IMAGE_LOCATION and resizes the image.
 *
 * @param array $file
 * @return string
 */
function getImageURL($file) {
    $file_name = substr($file["tmp_name"], 8);
    if (!$file_name) {
        return "";
    }
    if ($file["error"] <= 0) {
        while (file_exists(IMAGE_LOCATION . $file_name)) {
            $file_name .= "1";
        }

        if (mime_content_type($file["tmp_name"]) == "image/gif") {
            $file_name .= ".gif";
            move_uploaded_file($file["tmp_name"], IMAGE_LOCATION . $file_name);
            return URL . IMAGE_LOCATION . $file_name . "\n";
        }

        $img_content = file_get_contents($file["tmp_name"]);
        $size = getimagesize($file["tmp_name"]);
        if (is_array($size)) {
            list($width, $height) = $size;
            resizeImage(imagecreatefromstring($img_content), $file_name, $width, $height, $gif);
            return URL . IMAGE_LOCATION . $file_name . "\n";
        }
    }
    return "";
}

/**
 * Uploads the file to the FILE_LOCATION.
 *
 * @param string $text
 * @param string $file_name
 * @return string
 */
function getFileURL($text, $file_name) {
    if (!$file_name) {
        return "";
    }

    $file = fopen(FILE_LOCATION . $file_name, "w");
    if ($file !== false) {
        fwrite($file, $text);
        fclose($file);
        return URL . FILE_LOCATION . $file_name;
    }
    return "";
}
if ($_SERVER["HTTP_API_ID"] === API_ID
    && $_SERVER["HTTP_API_KEY"] === API_KEY) {
    if (isset($_FILES["image"])) {
        echo getImageURL($_FILES["image"]);
    }
    else if (isset($_GET["text"]) && isset($_GET["name"])) {
        echo getFileURL($_GET["text"], $_GET["name"]);
    }
    else {
        echo "no file was sent\n";
    }
}
else {
    echo "incorrect API info";
}

