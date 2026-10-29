import { type FormEvent, useState } from 'react';
import {
  Alert,
  Badge,
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Group,
  List,
  Paper,
  Select,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  TextInput,
  ThemeIcon,
  Title,
} from '@mantine/core';
import { Check, CheckCircle2, Phone, Send } from 'lucide-react';
import { buildWhatsAppUrl, PHONES, WHATSAPP_URL } from '../config/contacts';
import { OBJECT_TYPE_KEYS, objectTypeForMessage, type ObjectTypeKey } from '../i18n/translations';
import { useLanguage } from '../i18n/LanguageContext';
import { WhatsAppIcon } from './icons/BrandIcons';

/* ------------------------------------------------------------------ */
/* Phone helpers                                                       */
/* ------------------------------------------------------------------ */

const normalizeDigits = (input: string): string => {
  let digits = input.replace(/\D/g, '');
  if (!digits) return '';
  if (digits.length === 10 && !input.trim().startsWith('+')) digits = `7${digits}`;
  if (digits.length === 12 && (digits[1] === '7' || digits[1] === '8')) digits = `7${digits.slice(2)}`;
  if (digits === '78') digits = '7';
  if (digits[0] === '8') digits = `7${digits.slice(1)}`;
  if (digits[0] !== '7') digits = `7${digits}`;
  return digits.slice(0, 11);
};

export const formatPhone = (input: string): string => {
  const d = normalizeDigits(input);
  if (!d) return '';
  const r = d.slice(1);
  let out = '+7';
  if (r.length > 0) out += ` (${r.slice(0, 3)}`;
  if (r.length >= 3) out += ')';
  if (r.length > 3) out += ` ${r.slice(3, 6)}`;
  if (r.length > 6) out += `-${r.slice(6, 8)}`;
  if (r.length > 8) out += `-${r.slice(8, 10)}`;
  return out;
};

const isPhoneValid = (value: string) => normalizeDigits(value).length === 11;

interface FormState {
  name: string;
  phone: string;
  objectType: ObjectTypeKey;
  comment: string;
}

const buildMessage = (
  { name, phone, objectType, comment }: FormState,
  tags: string[]
): string => {
  const parts = [
    'Здравствуйте, ProCam! Заявка с сайта на расчёт системы видеонаблюдения:',
    `👤 Имя: ${name.trim()}`,
    `📞 Телефон: ${phone}`,
    `🏢 Объект: ${objectTypeForMessage(objectType)}`,
  ];
  if (tags.length > 0) {
    parts.push(`🏷️ Параметры: ${tags.join(', ')}`);
  }
  if (comment.trim()) {
    parts.push(`💬 Комментарий: ${comment.trim()}`);
  }
  return parts.join('\n');
};

const openWhatsApp = (url: string) => {
  const win = window.open(url, '_blank');
  if (win) {
    win.opener = null;
  } else {
    window.location.href = url;
  }
};

type Errors = Partial<Record<'name' | 'phone', string>>;

const initialState: FormState = { name: '', phone: '', objectType: 'house', comment: '' };

const QUICK_CHIPS = [
  '4 камеры',
  '8 камер',
  'ColorVu (ночной цвет)',
  'Монтаж под ключ',
  'Настройка / ремонт',
];

export default function CallbackForm() {
  const { t } = useLanguage();
  const f = t.form;

  const [form, setForm] = useState<FormState>(initialState);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const validate = (): boolean => {
    const next: Errors = {};
    if (!form.name.trim()) next.name = f.errors.name;
    if (!isPhoneValid(form.phone)) next.phone = f.errors.phone;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const msg = buildMessage(form, selectedTags);
    const url = buildWhatsAppUrl(msg);
    openWhatsApp(url);
    setSent(true);
  };

  const selectData = OBJECT_TYPE_KEYS.map((key) => ({
    value: key,
    label: f.objectTypes[key],
  }));

  return (
    <Box component="section" id="contacts">
      <Container size="xl" py={{ base: 50, md: 80 }}>
        <Paper bg="dark.9" c="white" p={{ base: 'xl', md: 50 }} radius="xl">
          <Grid gutter={{ base: 32, lg: 48 }} align="center">
            {/* ============================================================ */}
            {/* LEFT COLUMN: Intro, Bullets, Direct Phones                   */}
            {/* ============================================================ */}
            <Grid.Col span={{ base: 12, lg: 5 }}>
              <Stack gap="md">
                <Group gap="xs">
                  <Badge color="teal" variant="dot" size="lg">
                    ONLINE · ОТВЕТ ЗА 5 МИНУТ
                  </Badge>
                </Group>

                <Title order={2} fz={{ base: 28, sm: 38 }} c="white" lh={1.12}>
                  {f.title}
                </Title>

                <Text c="gray.4" fz="md">
                  {f.subtitle}
                </Text>

                <List
                  spacing="sm"
                  my="xs"
                  icon={
                    <ThemeIcon color="teal" variant="light" size={22} radius="xl">
                      <Check size={13} />
                    </ThemeIcon>
                  }
                >
                  {f.bullets.map((b) => (
                    <List.Item key={b}>
                      <Text c="gray.2" fz="sm" fw={500}>
                        {b}
                      </Text>
                    </List.Item>
                  ))}
                </List>

                <Stack gap="xs" pt="md" style={{ borderTop: '1px solid var(--mantine-color-dark-6)' }}>
                  <Text fz="xs" ff="monospace" tt="uppercase" c="gray.5">
                    Прямые телефоны инженеров (Алматы)
                  </Text>
                  <Group gap="sm" wrap="wrap">
                    <Button
                      component="a"
                      href={PHONES.main.tel}
                      variant="outline"
                      color="gray.3"
                      leftSection={<Phone size={15} />}
                    >
                      +7 (706) 606-63-23
                    </Button>
                    <Button
                      component="a"
                      href="tel:+77776066323"
                      variant="outline"
                      color="gray.5"
                      leftSection={<Phone size={15} />}
                    >
                      +7 (777) 606-63-23
                    </Button>
                  </Group>
                  <Group mt={4}>
                    <Button
                      component="a"
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="subtle"
                      color="teal"
                      size="xs"
                      leftSection={<WhatsAppIcon size={15} />}
                    >
                      Написать напрямую в WhatsApp
                    </Button>
                  </Group>
                </Stack>
              </Stack>
            </Grid.Col>

            {/* ============================================================ */}
            {/* RIGHT COLUMN: Quick-Select Chips + Mantine Form              */}
            {/* ============================================================ */}
            <Grid.Col span={{ base: 12, lg: 7 }}>
              <Paper
                component="form"
                noValidate
                onSubmit={onSubmit}
                p={{ base: 'md', sm: 'xl' }}
                radius="lg"
                bg="dark.8"
                c="white"
                style={{ border: '1px solid var(--mantine-color-dark-5)' }}
              >
                <Stack gap="md">
                  <Box>
                    <Text fz="xs" fw={700} tt="uppercase" c="gray.4" mb="xs">
                      {f.quickTagsTitle}
                    </Text>
                    <Chip.Group multiple value={selectedTags} onChange={setSelectedTags}>
                      <Group gap="xs" mb="lg">
                        {QUICK_CHIPS.map((chipLabel) => (
                          <Chip
                            key={chipLabel}
                            value={chipLabel}
                            variant="outline"
                            color="teal"
                            size="xs"
                            styles={{
                              label: {
                                color: 'var(--mantine-color-gray-1)',
                                borderColor: 'var(--mantine-color-dark-4)',
                              },
                            }}
                          >
                            {chipLabel}
                          </Chip>
                        ))}
                      </Group>
                    </Chip.Group>
                  </Box>

                  <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                    <TextInput
                      size="md"
                      required
                      label={f.nameLabel}
                      placeholder={f.namePlaceholder}
                      value={form.name}
                      error={errors.name}
                      styles={{ label: { color: 'var(--mantine-color-gray-2)', marginBottom: 4 } }}
                      onChange={(e) => {
                        const val = e.currentTarget.value;
                        setForm((prev) => ({ ...prev, name: val }));
                        setSent(false);
                        setErrors((prev) => ({ ...prev, name: undefined }));
                      }}
                    />

                    <TextInput
                      size="md"
                      required
                      type="tel"
                      label={f.phoneLabel}
                      placeholder={f.phonePlaceholder}
                      value={form.phone}
                      error={errors.phone}
                      styles={{ label: { color: 'var(--mantine-color-gray-2)', marginBottom: 4 } }}
                      onFocus={() => !form.phone && setForm((p) => ({ ...p, phone: '+7' }))}
                      onBlur={() => form.phone === '+7' && setForm((p) => ({ ...p, phone: '' }))}
                      onChange={(e) => {
                        const formatted = formatPhone(e.currentTarget.value);
                        setForm((prev) => ({ ...prev, phone: formatted }));
                        setSent(false);
                        setErrors((prev) => ({ ...prev, phone: undefined }));
                      }}
                    />
                  </SimpleGrid>

                  <Select
                    size="md"
                    label={f.objectTypeLabel}
                    data={selectData}
                    value={form.objectType}
                    allowDeselect={false}
                    styles={{ label: { color: 'var(--mantine-color-gray-2)', marginBottom: 4 } }}
                    onChange={(val) => {
                      if (val) {
                        setForm((prev) => ({ ...prev, objectType: val as ObjectTypeKey }));
                      }
                    }}
                  />

                  <Textarea
                    size="md"
                    minRows={3}
                    autosize
                    label={`${f.commentLabel} (${f.optional})`}
                    placeholder={f.commentPlaceholder}
                    value={form.comment}
                    styles={{ label: { color: 'var(--mantine-color-gray-2)', marginBottom: 4 } }}
                    onChange={(e) => {
                      const val = e.currentTarget.value;
                      setForm((prev) => ({ ...prev, comment: val }));
                    }}
                  />

                  <Button
                    type="submit"
                    size="lg"
                    fullWidth
                    color="gray.0"
                    c="dark.9"
                    fw={700}
                    leftSection={<Send size={18} />}
                  >
                    Отправить заявку в WhatsApp
                  </Button>

                  <Text fz="xs" c="gray.5" ta="center">
                    {f.note}
                  </Text>

                  {sent && (
                    <Alert
                      color="teal"
                      variant="light"
                      icon={<CheckCircle2 size={16} />}
                      title="Заявка сформирована"
                    >
                      {f.success}
                    </Alert>
                  )}
                </Stack>
              </Paper>
            </Grid.Col>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}
