<!doctype html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <title>بطاقة التعريف الفردية</title>
    <style>
      @page {
        margin: 10mm;
      }
      body {
        font-family: 'dejavusans', Arial, sans-serif;
        direction: rtl;
        margin: 0;
      }
      .container {
        width: 100%;
      }
      .header {
        text-align: center;
        margin-bottom: 20px;
      }
      h1,
      h2,
      h3 {
        text-align: center;
        margin: 3px 0;
      }
      .section {
        margin-top: 10px;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 10px;
      }
      table,
      th,
      td {
        border: 1px solid black;
      }
      th,
      td {
        padding: 4px;
        text-align: center;
        font-size: 12px;
      }
      .gray {
        background-color: #f0f0f0;
      }
      .small {
        font-size: 11px;
      }
      .signature {
        margin-top: 20px;
        width: 100%;
      }
      .signature td {
        border: none;
        width: 50%;
        text-align: center;
        font-weight: bold;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <table style="width: 100%; margin-bottom: 15px; border: none;">
        <tr>
            <td style="width: 50%; vertical-align: top; text-align: center; font-weight: bold; line-height: 1.5; border: none;">
                المملكة المغربية<br>
                وزارة الداخلية<br>
                ولاية جهة طنجة تطوان الحسيمة<br>
                عمالة إقليم العرائش<br>
                جماعة العرائش<br>
                مديرية المصالح<br>
                قسم الموارد البشرية
            </td>
            <td style="width: 50%; vertical-align: top; text-align: left; line-height: 1.5; border: none;">
                <p style="margin: 3px 0;">الانتساب المالي : م.ع.</p>
                <p style="margin: 3px 0;">رقم التأجير : {{ $fonctionnaire->matricule ?? '................' }}</p>
                <p style="margin: 3px 0;">رقم ب.و.ت : {{ $fonctionnaire->cnie ?? '................' }}</p>
                <p style="margin: 3px 0;">رقم : ................</p>
            </td>
        </tr>
      </table>
      
      <h2 class="section">بطاقة التعريف الفردية برسم سنة {{ date('Y') }}</h2>
      
      <table>
        <tr>
          <td colspan="7" style="background-color: #f0f0f0; font-weight: bold;">1. هوية الموظف</td>
        </tr>
        <tr>
          <td colspan="2">الاسم العائلي</td>
          <td colspan="3">{{ $fonctionnaire->nom ?? '' }}</td>
          <td colspan="2">Nom</td>
        </tr>
        <tr>
          <td colspan="2">الاسم الشخصي</td>
          <td colspan="3">{{ $fonctionnaire->prenom ?? '' }}</td>
          <td colspan="2">Prénom</td>
        </tr>
        <tr>
          <td>تاريخ الازدياد</td>
          <td colspan="2">{{ isset($fonctionnaire->date_naissance) ? (is_string($fonctionnaire->date_naissance) ? $fonctionnaire->date_naissance : $fonctionnaire->date_naissance->format('d/m/Y')) : '' }}</td>
          <td>مكان الازدياد</td>
          <td colspan="3">{{ $fonctionnaire->lieu_naissance ?? '' }}</td>
        </tr>
        <tr>
          <td>الحالة العائلية</td>
          <td colspan="2">{{ $fonctionnaire->situation_familiale ?? '' }}</td>
          <td>عدد الأطفال</td>
          <td colspan="3">{{ $fonctionnaire->nombre_enfants ?? '' }}</td>
        </tr>
        <tr>
          <td>تاريخ ولوج الوظيفة العمومية</td>
          <td colspan="2">{{ isset($fonctionnaire->date_recrutement) ? (is_string($fonctionnaire->date_recrutement) ? $fonctionnaire->date_recrutement : $fonctionnaire->date_recrutement->format('d/m/Y')) : '' }}</td>
          <td>رقم ب.ت.و</td>
          <td colspan="3">{{ $fonctionnaire->cnie ?? '' }}</td>
        </tr>
        <tr>
          <td>الرتبة والأقدمية</td>
          <td colspan="2">{{ isset($fonctionnaire->echelonActuel) ? $fonctionnaire->echelonActuel->numero : '' }} - {{ $fonctionnaire->anciennete ?? '' }}</td>
          <td>رقم التأجير</td>
          <td colspan="3">{{ $fonctionnaire->matricule ?? '' }}</td>
        </tr>
        <tr>
          <td>الدرجة ومقر التعيين</td>
          <td colspan="2">{{ isset($fonctionnaire->gradeActuel) ? $fonctionnaire->gradeActuel->intitule : '' }}</td>
          <td>تاريخ التعيين في الدرجة</td>
          <td colspan="3">{{ isset($fonctionnaire->date_titularisation) ? (is_string($fonctionnaire->date_titularisation) ? $fonctionnaire->date_titularisation : $fonctionnaire->date_titularisation->format('d/m/Y')) : (isset($fonctionnaire->date_recrutement) ? (is_string($fonctionnaire->date_recrutement) ? $fonctionnaire->date_recrutement : $fonctionnaire->date_recrutement->format('d/m/Y')) : '') }}</td>
        </tr>
        <tr>
          <td>الوظيفة المزاولة حاليا</td>
          <td colspan="6">{{ $fonctionnaire->poste ?? '' }}</td>
        </tr>
        <tr>
          <td>العنوان الشخصي</td>
          <td colspan="6">{{ $fonctionnaire->adresse ?? '' }}</td>
        </tr>
        
        <tr>
          <td colspan="7" style="background-color: #f0f0f0; font-weight: bold; text-align: right; padding-right: 10px;">2. النقط الممنوحة</td>
        </tr>
        <tr>
          <td rowspan="2" colspan="2" style="font-weight: bold;">عناصر التنقيط</td>
          <td rowspan="2" colspan="2" style="font-weight: bold;">سلم التنقيط</td>
          <td colspan="3" style="font-weight: bold;">النقط الممنوحة</td>
        </tr>
        <tr>
          <td colspan="3" style="font-weight: bold;">الرئيس المباشر</td>
        </tr>
        <tr>
          <td>1</td>
          <td>إنجاز المهام المرتبطة بالوظيفة</td>
          <td colspan="2" >من 0 إلى 5</td>
          <td colspan="3" >{{ $contenu['note_taches'] ?? $contenu['notation']['note_taches'] ?? '' }}</td>
        </tr>
        <tr>
          <td>2</td>
          <td>المردودية</td>
          <td colspan="2" >من 0 إلى 5</td>
          <td colspan="3" >{{ $contenu['note_rendement'] ?? $contenu['notation']['note_rendement'] ?? '' }}</td>
        </tr>
        <tr>
          <td>3</td>
          <td>القدرة على التنظيم</td>
          <td colspan="2" >من 0 إلى 3</td>
          <td colspan="3" >{{ $contenu['note_organisation'] ?? $contenu['notation']['note_organisation'] ?? '' }}</td>
        </tr>
        <tr>
          <td>4</td>
          <td>السلوك المهني</td>
          <td colspan="2" >من 0 إلى 4</td>
          <td colspan="3" >{{ $contenu['note_comportement'] ?? $contenu['notation']['note_comportement'] ?? '' }}</td>
        </tr>
        <tr>
          <td>5</td>
          <td>البحث والابتكار</td>
          <td colspan="2" >من 0 إلى 3</td>
          <td colspan="3" >{{ $contenu['note_recherche'] ?? $contenu['notation']['note_recherche'] ?? '' }}</td>
        </tr>
        <tr>
          <td colspan="2" style="font-weight: bold;">مجموع النقط الجزئية</td>
          <td colspan="2" style="font-weight: bold;">من 0 إلى 20</td>
          <td colspan="3"  style="font-weight: bold;">{{ $contenu['note'] ?? $contenu['notation']['note'] ?? '' }}</td>
        </tr>
        
        <tr>
          <td colspan="7" style="background-color: #f0f0f0; font-weight: bold; text-align: right; padding-right: 10px;">3. الميزة الممنوحة بناء على نقطة السيد المدير</td>
        </tr>
        <tr>
          @php 
            $note = $contenu['note'] ?? $contenu['notation']['note'] ?? 0;
          @endphp
          <td>[{{ $note >= 18 ? 'X' : ' ' }}] ممتاز<br> 18 ≤ نقطة ≤ 20</td>
          <td>[{{ ($note >= 16 && $note < 18) ? 'X' : ' ' }}] جيد جدا <br> 16 ≤ نقطة < 18</td>
          <td>[{{ ($note >= 14 && $note < 16) ? 'X' : ' ' }}] جيد <br> 14 ≤ نقطة < 16</td>
          <td colspan="2">[{{ ($note >= 10 && $note < 14) ? 'X' : ' ' }}] متوسط <br> 10 ≤ نقطة < 14</td>
          <td colspan="2">[{{ $note < 10 ? 'X' : ' ' }}] ضعيف  <br> نقطة < 10</td>
        </tr>
        
        <tr>
          <td class="gray" colspan="7" style="font-weight: bold; text-align: right; padding-right: 10px;">4. نسق الترقية في الرتبة</td>
        </tr>
        <tr>
          @php 
            $rythme = $contenu['rythme'] ?? $contenu['notation']['rythme'] ?? '';
          @endphp
          <td colspan="2">سريع [{{ $rythme == 'rapide' ? 'X' : ' ' }}]<br> 16 ≤ نقطة</td>
          <td colspan="3">متوسط [{{ $rythme == 'moyen' ? 'X' : ' ' }}]<br> 10 ≤ نقطة < 16</td>
          <td colspan="2">بطيء [{{ $rythme == 'lent' ? 'X' : ' ' }}]<br> نقطة < 10</td>
        </tr>
      </table>

      <table class="signature" style="border: none; margin-top: 20px;">
        <tr style="border: none;">
          <td style="border: none; width: 50%; font-size: 14px;">
            توقيع الرئيس المباشر<br>
            <span style="font-size: 10px; color: #666;">{{ $contenu['nom_chef_direct'] ?? '' }}</span>
          </td>
          <td style="border: none; width: 50%; font-size: 14px;">
            توقيع الوالي / العامل<br>
            <span style="font-size: 10px; color: #666;">{{ $contenu['nom_directeur'] ?? '' }}</span>
          </td>
        </tr>
      </table>

      <div class="section small" style="text-align: left; margin-top: 20px; font-size: 12px;">
        حرر بـ: {{ $contenu['lieu_redaction'] ?? 'العرائش' }} في: {{ isset($contenu['date_acte']) ? date('d/m/Y', strtotime($contenu['date_acte'])) : ($date_formatted ?? date('d/m/Y')) }}
      </div>
    </div>
  </body>
</html>
