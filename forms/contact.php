<?php
/**
 * @author Felix Alveus Seventeen Sihite
 * @version 1.0.0
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

define('RECIPIENT_EMAIL', 'lixsihite@gmail.com');
define('RECIPIENT_NAME', 'Felix Sihite');
define('SITE_NAME', 'Felix Sihite Portfolio');

/**
 * Sanitize input data
 * 
 * @param string $data Input data to sanitize
 * @return string Sanitized data
 */
function sanitize($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
    return $data;
}

/**
 * Validate email address
 * 
 * @param string $email Email to validate
 * @return bool True if valid, false otherwise
 */
function isValidEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

/**
 * Send JSON response
 * 
 * @param bool $success Success status
 * @param string $message Response message
 */
function sendResponse($success, $message) {
    echo json_encode([
        'success' => $success,
        'message' => $message
    ]);
    exit;
}

/**
 * Log contact form submission
 * 
 * @param array $data Form data
 * @param bool $success Whether the submission was successful
 */
function logSubmission($data, $success) {
    $logFile = __DIR__ . '/contact_log.txt';
    $timestamp = date('Y-m-d H:i:s');
    $status = $success ? 'SUCCESS' : 'FAILED';
    $logEntry = "[$timestamp] [$status] Name: {$data['name']}, Email: {$data['email']}, Subject: {$data['subject']}\n";
    
    file_put_contents($logFile, $logEntry, FILE_APPEND | LOCK_EX);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(false, 'Invalid request method.');
}

$name = isset($_POST['name']) ? sanitize($_POST['name']) : '';
$email = isset($_POST['email']) ? sanitize($_POST['email']) : '';
$subject = isset($_POST['subject']) ? sanitize($_POST['subject']) : '';
$message = isset($_POST['message']) ? sanitize($_POST['message']) : '';

if (empty($name)) {
    sendResponse(false, 'Please enter your name.');
}

if (empty($email)) {
    sendResponse(false, 'Please enter your email address.');
}

if (!isValidEmail($email)) {
    sendResponse(false, 'Please enter a valid email address.');
}

if (empty($subject)) {
    sendResponse(false, 'Please enter a subject.');
}

if (empty($message)) {
    sendResponse(false, 'Please enter your message.');
}

if (strlen($name) < 2) {
    sendResponse(false, 'Name must be at least 2 characters long.');
}

if (strlen($subject) < 4) {
    sendResponse(false, 'Subject must be at least 4 characters long.');
}

if (strlen($message) < 10) {
    sendResponse(false, 'Message must be at least 10 characters long.');
}

$emailSubject = "[" . SITE_NAME . "] New Contact: " . $subject;

$emailBody = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #2aa4ff, #0d85f8); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #555; }
        .value { margin-top: 5px; padding: 10px; background: white; border-radius: 4px; }
        .footer { text-align: center; padding: 15px; color: #666; font-size: 12px; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>New Contact Form Submission</h2>
        </div>
        <div class='content'>
            <div class='field'>
                <div class='label'>Name:</div>
                <div class='value'>{$name}</div>
            </div>
            <div class='field'>
                <div class='label'>Email:</div>
                <div class='value'><a href='mailto:{$email}'>{$email}</a></div>
            </div>
            <div class='field'>
                <div class='label'>Subject:</div>
                <div class='value'>{$subject}</div>
            </div>
            <div class='field'>
                <div class='label'>Message:</div>
                <div class='value'>" . nl2br($message) . "</div>
            </div>
        </div>
        <div class='footer'>
            <p>This email was sent from the contact form on " . SITE_NAME . "</p>
            <p>Sent on: " . date('F j, Y \a\t g:i A') . "</p>
        </div>
    </div>
</body>
</html>
";

$plainTextBody = "
New Contact Form Submission
===========================

Name: {$name}
Email: {$email}
Subject: {$subject}

Message:
{$message}

---
Sent from: " . SITE_NAME . "
Date: " . date('F j, Y \a\t g:i A') . "
";

$headers = [
    'MIME-Version: 1.0',
    'Content-type: text/html; charset=UTF-8',
    'From: ' . SITE_NAME . ' <noreply@' . $_SERVER['HTTP_HOST'] . '>',
    'Reply-To: ' . $name . ' <' . $email . '>',
    'X-Mailer: PHP/' . phpversion()
];

$formData = [
    'name' => $name,
    'email' => $email,
    'subject' => $subject,
    'message' => $message
];

$mailSent = @mail(RECIPIENT_EMAIL, $emailSubject, $emailBody, implode("\r\n", $headers));

logSubmission($formData, $mailSent);

if ($mailSent) {
    $autoReplySubject = "Thank you for contacting " . RECIPIENT_NAME;
    $autoReplyBody = "
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='UTF-8'>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #2aa4ff, #0d85f8); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
            .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
            .footer { text-align: center; padding: 15px; color: #666; font-size: 12px; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>Thank You for Reaching Out!</h2>
            </div>
            <div class='content'>
                <p>Dear {$name},</p>
                <p>Thank you for contacting me through my portfolio website. I have received your message and will get back to you as soon as possible.</p>
                <p>Here's a summary of your message:</p>
                <p><strong>Subject:</strong> {$subject}</p>
                <p><strong>Message:</strong><br>" . nl2br($message) . "</p>
                <p>Best regards,<br>" . RECIPIENT_NAME . "</p>
            </div>
            <div class='footer'>
                <p>This is an automated response. Please do not reply to this email.</p>
            </div>
        </div>
    </body>
    </html>
    ";

    $autoReplyHeaders = [
        'MIME-Version: 1.0',
        'Content-type: text/html; charset=UTF-8',
        'From: ' . RECIPIENT_NAME . ' <' . RECIPIENT_EMAIL . '>',
        'X-Mailer: PHP/' . phpversion()
    ];

    @mail($email, $autoReplySubject, $autoReplyBody, implode("\r\n", $autoReplyHeaders));

    sendResponse(true, 'Thank you! Your message has been sent successfully. I will get back to you soon.');
} else {
    sendResponse(false, 'Sorry, there was an error sending your message. Please try again later or contact me directly at ' . RECIPIENT_EMAIL);
}
?>
