<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body {
            font-family: DejaVu Sans, sans-serif;
            text-align: center;
            padding: 50px;
        }
        .certificate {
            border: 10px solid #1a5276;
            padding: 40px;
            margin: 20px;
        }
        .title {
            font-size: 28px;
            color: #1a5276;
            margin-bottom: 30px;
            text-transform: uppercase;
            font-weight: bold;
        }
        .content {
            font-size: 16px;
            margin: 20px 0;
            line-height: 1.6;
        }
        .reference {
            font-size: 14px;
            color: #666;
            margin: 20px 0;
        }
        .signature {
            margin-top: 60px;
            display: flex;
            justify-content: space-between;
        }
        .signature-box {
            text-align: center;
            width: 200px;
        }
        .signature-line {
            border-top: 2px solid #000;
            margin-top: 40px;
        }
        .date {
            margin-top: 10px;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="certificate">
        <div class="title">{{ $title }}</div>
        
        <div class="content">
            <p>Ceci est pour certifier que</p>
            <h2>{{ $candidat->user->name }}</h2>
            <p>Né(e) le : {{ $candidat->date_of_birth->format('d/m/Y') }}</p>
            <p>CIN : {{ $candidat->cin }}</p>
            <br>
            <p>{{ $content }}</p>
        </div>
        
        <div class="reference">
            <p><strong>Référence :</strong> {{ $reference }}</p>
            <p><strong>Date d'émission :</strong> {{ $issue_date->format('d/m/Y') }}</p>
        </div>
        
        <div class="signature">
            <div class="signature-box">
                <div class="signature-line"></div>
                <div class="date">{{ $issue_date->format('d/m/Y') }}</div>
            </div>
            <div class="signature-box">
                <div class="signature-line"></div>
                <div>{{ $generator->name }}</div>
                <div>{{ $generator->role === 'admin' ? 'Administrateur' : 'Responsable' }}</div>
            </div>
        </div>
    </div>
</body>
</html>