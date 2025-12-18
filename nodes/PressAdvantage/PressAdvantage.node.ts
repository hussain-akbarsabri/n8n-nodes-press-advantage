import { INodeType, INodeTypeDescription } from 'n8n-workflow';

export class PressAdvantage implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Press Advantage',
    name: 'pressAdvantage',
    icon: 'file:press-advantage.png',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: 'Press Advantage API',
    defaults: {
      name: 'Press Advantage',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [
      {
        name: 'PressAdvantageApi',
        required: true,
      },
    ],
    requestDefaults: {
      baseURL: 'https://app.pressadvantage.com/api/customers',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
    properties: [
      {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        noDataExpression: true,
        options: [
          {
            name: 'Organization',
            value: 'organization',
          },
          {
            name: 'Release',
            value: 'release',
          },
        ],
        default: 'organization',
      },

      {
        displayName: 'Action',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
          show: {
            resource: ['organization'],
          },
        },
        options: [
          {
            name: 'Get all the organizations',
            value: 'getAll',
            action: 'Get all organizations',
            routing: {
              request: {
                method: 'GET',
                url: '/organizations.json',
                qs: {
                  api_key: '={{$credentials.apiKey}}',
                },
              },
            },
          },
          {
            name: 'Create an organization',
            value: 'create',
            action: 'Create an organization',
            description: '',
            routing: {
              request: {
                method: 'POST',
                url: '/organizations.json',
                qs: {
                  api_key: '={{$credentials.apiKey}}',
                },
                body: {
                  organization: {
                    name: '={{$parameter["name"]}}',
                    contact_name: '={{$parameter["contactName"]}}',
                    contact_phone: '={{$parameter["contactPhone"]}}',
                    contact_email: '={{$parameter["contactEmail"]}}',
                    website_url: '={{$parameter["websiteUrl"]}}',
                  },
                },
              },
            },
          },
          {
            name: 'Get organization by id',
            value: 'getById',
            action: 'Get organization by id',
            routing: {
              request: {
                method: 'GET',
                url: '=/organizations/{{$parameter["organizationId"]}}.json',
                qs: {
                  api_key: '={{$credentials.apiKey}}',
                },
              },
            },
          },
          {
            name: 'Update organization',
            value: 'update',
            action: 'Update organization',
            routing: {
              request: {
                method: 'PUT',
                url: '=/organizations/{{$parameter["organizationId"]}}.json',
                qs: {
                  api_key: '={{$credentials.apiKey}}',
                },
                body: {
                  organization: {
                    name: '={{$parameter["name"]}}',
                    contact_name: '={{$parameter["contactName"]}}',
                    contact_phone: '={{$parameter["contactPhone"]}}',
                    contact_email: '={{$parameter["contactEmail"]}}',
                    website_url: '={{$parameter["websiteUrl"]}}',
                  },
                },
              },
            },
          },
          {
            name: 'Get all releases for the organization',
            value: 'organizationReleases',
            action: 'Get all releases for the organization',
            routing: {
              request: {
                method: 'GET',
                url: '=/organizations/{{$parameter["organizationId"]}}/releases.json',
                qs: {
                  api_key: '={{$credentials.apiKey}}',
                },
              },
            },
          },
        ],
        default: 'getAll',
      },

      {
        displayName: 'Organization ID',
        name: 'organizationId',
        type: 'number',
        default: 0,
        required: false,
        displayOptions: {
          show: {
            resource: ['organization'],
            operation: ['getById', 'update', 'delete', 'organizationReleases'],
          },
        },
      },
      {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        default: '',
        required: false,
        displayOptions: {
          show: {
            resource: ['organization'],
            operation: ['create', 'update'],
          },
        },
      },
      {
        displayName: 'Contact Name',
        name: 'contactName',
        type: 'string',
        default: '',
        displayOptions: {
          show: {
            resource: ['organization'],
            operation: ['create', 'update'],
          },
        },
      },
      {
        displayName: 'Contact Phone',
        name: 'contactPhone',
        type: 'string',
        default: '',
        displayOptions: {
          show: {
            resource: ['organization'],
            operation: ['create', 'update'],
          },
        },
      },
      {
        displayName: 'Contact Email',
        name: 'contactEmail',
        type: 'string',
        default: '',
        displayOptions: {
          show: {
            resource: ['organization'],
            operation: ['create', 'update'],
          },
        },
      },
      {
        displayName: 'Website URL',
        name: 'websiteUrl',
        type: 'string',
        default: '',
        displayOptions: {
          show: {
            resource: ['organization'],
            operation: ['create', 'update'],
          },
        },
      },

      {
        displayName: 'Action',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
          show: {
            resource: ['release'],
          },
        },
        options: [
          {
            name: 'Get all the releases',
            value: 'list',
            action: 'Get all releases',
            routing: {
              request: {
                method: 'GET',
                url: '/releases.json',
                qs: {
                  api_key: '={{$credentials.apiKey}}',
                },
              },
            },
          },
          {
            name: 'Get release by id',
            value: 'getById',
            action: 'Get release by id',
            routing: {
              request: {
                method: 'GET',
                url: '=/releases/{{$parameter["releaseId"]}}.json',
                qs: {
                  api_key: '={{$credentials.apiKey}}',
                },
              },
            },
          },
          {
            name: 'Create self-written release (with_content)',
            value: 'createWithContent',
            action: 'Create a self written release',
            routing: {
              request: {
                method: 'POST',
                url: '/releases/with_content.json',
                qs: {
                  api_key: '={{$credentials.apiKey}}',
                },
                body: {
                  release: {
                    organization_id: '={{$parameter["organizationId"]}}',
                    description: '={{$parameter["description"]}}',
                    distribution: '={{$parameter["distribution"]}}',
                    schedule_distribution: '={{$parameter["scheduleDistribution"]}}',
                    title: '={{$parameter["title"]}}',
                    body: '={{$parameter["body"]}}',
                  },
                },
              },
            },
          },
          {
            name: 'Create written-for-you release (order)',
            value: 'createWritten',
            action: 'Create release with writing service',
            routing: {
              request: {
                method: 'POST',
                url: '/releases.json',
                qs: {
                  api_key: '={{$credentials.apiKey}}',
                },
                body: {
                  release: {
                    organization_id: '={{$parameter["organizationId"]}}',
                    description: '={{$parameter["description"]}}',
                    distribution: '={{$parameter["distribution"]}}',
                    schedule_distribution: '={{$parameter["scheduleDistribution"]}}',
                    distribute_at: '={{$parameter["distributeAt"]}}',
                    main_keyword: '={{$parameter["mainKeyword"]}}',
                    url: '={{$parameter["url"]}}',
                    keyword: '={{$parameter["keyword"]}}',
                    notes: '={{$parameter["notes"]}}',
                  },
                },
              },
            },
          },

          {
            name: 'Sandbox: editor rejects content to customer',
            value: 'sandboxEditorRejectsToCustomer',
            action: 'Sandbox editorial reject to customer',
            routing: {
              request: {
                method: 'POST',
                url: '=/releases/sandbox/{{$parameter["releaseId"]}}/editor_rejects_content_to_customer.json',
                qs: {
                  api_key: '={{$credentials.apiKey}}',
                },
              },
            },
          },
          {
            name: 'Revise content (customer)',
            value: 'reviseContent',
            action: 'Revise content for release',
            routing: {
              request: {
                method: 'POST',
                url: '=/releases/{{$parameter["releaseId"]}}/revise_content.json',
                qs: {
                  api_key: '={{$credentials.apiKey}}',
                },
                body: {
                  release: {
                    title: '={{$parameter["title"]}}',
                    body: '={{$parameter["body"]}}',
                  },
                },
              },
            },
          },
          {
            name: 'Editor approves content (sandbox)',
            value: 'sandboxEditorApprovesContent',
            action: 'Sandbox editor approves content',
            routing: {
              request: {
                method: 'POST',
                url: '=/releases/sandbox/{{$parameter["releaseId"]}}/editor_approves_content.json',
                qs: {
                  api_key: '={{$credentials.apiKey}}',
                },
              },
            },
          },
          {
            name: 'Sandbox: distribution ordered',
            value: 'sandboxDistributionOrdered',
            action: 'Sandbox distribution ordered',
            routing: {
              request: {
                method: 'POST',
                url: '=/releases/sandbox/{{$parameter["releaseId"]}}/distribution_ordered.json',
                qs: {
                  api_key: '={{$credentials.apiKey}}',
                },
              },
            },
          },
          {
            name: 'Sandbox: distribution completed',
            value: 'sandboxDistributionCompleted',
            action: 'Sandbox distribution completed',
            routing: {
              request: {
                method: 'POST',
                url: '=/releases/sandbox/{{$parameter["releaseId"]}}/distribution_completed.json',
                qs: {
                  api_key: '={{$credentials.apiKey}}',
                },
              },
            },
          },

          {
            name: 'Sandbox: writers deliver order',
            value: 'sandboxWritersDeliver',
            action: 'Writers deliver order',
            routing: {
              request: {
                method: 'POST',
                url: '=/releases/sandbox/{{$parameter["releaseId"]}}/writers_deliver_order.json',
                qs: {
                  api_key: '={{$credentials.apiKey}}',
                },
              },
            },
          },
          {
            name: 'Approve guideline exception (customer)',
            value: 'approveGuidelineException',
            action: 'Approve guideline exception',
            routing: {
              request: {
                method: 'POST',
                url: '=/releases/{{$parameter["releaseId"]}}/approve_guideline_exception.json',
                qs: {
                  api_key: '={{$credentials.apiKey}}',
                },
              },
            },
          },
          {
            name: 'Reject content to writers',
            value: 'rejectContentToWriters',
            action: 'Reject content to writers',
            routing: {
              request: {
                method: 'POST',
                url: '=/releases/{{$parameter["releaseId"]}}/reject_content_to_writers.json',
                qs: {
                  api_key: '={{$credentials.apiKey}}',
                },
                body: {
                  release: {
                    rewrite_instructions: '={{$parameter["rewriteInstructions"]}}',
                  },
                },
              },
            },
          },
          {
            name: 'Approve content (customer)',
            value: 'approveContent',
            action: 'Approve content for release',
            routing: {
              request: {
                method: 'POST',
                url: '=/releases/{{$parameter["releaseId"]}}/approve_content.json',
                qs: {
                  api_key: '={{$credentials.apiKey}}',
                },
                body: {
                  release: {
                    title: '={{$parameter["title"]}}',
                  },
                },
              },
            },
          },
          {
            name: 'Distribution ordered',
            value: 'distributionOrdered',
            action: 'Mark distribution ordered',
            routing: {
              request: {
                method: 'POST',
                url: '=/releases/{{$parameter["releaseId"]}}/distribution_ordered.json',
                qs: {
                  api_key: '={{$credentials.apiKey}}',
                },
              },
            },
          },
          {
            name: 'Distribution completed',
            value: 'distributionCompleted',
            action: 'Mark distribution completed',
            routing: {
              request: {
                method: 'POST',
                url: '=/releases/{{$parameter["releaseId"]}}/distribution_completed.json',
                qs: {
                  api_key: '={{$credentials.apiKey}}',
                },
              },
            },
          },
        ],
        default: 'list',
      },

      {
        displayName: 'Release ID',
        name: 'releaseId',
        type: 'number',
        default: 0,
        required: false,
        displayOptions: {
          show: {
            resource: ['release'],
            operation: [
              'getById',
              'sandboxEditorRejectsToCustomer',
              'reviseContent',
              'sandboxEditorApprovesContent',
              'sandboxDistributionOrdered',
              'sandboxDistributionCompleted',
              'sandboxWritersDeliver',
              'approveGuidelineException',
              'rejectContentToWriters',
              'approveContent',
              'distributionOrdered',
              'distributionCompleted',
            ],
          },
        },
      },
      {
        displayName: 'Organization ID (for release)',
        name: 'organizationId',
        type: 'number',
        default: 0,
        required: false,
        displayOptions: {
          show: {
            resource: ['release'],
            operation: ['createWithContent', 'createWritten'],
          },
        },
      },
      {
        displayName: 'Title',
        name: 'title',
        type: 'string',
        default: '',
        displayOptions: {
          show: {
            resource: ['release'],
            operation: ['createWithContent', 'reviseContent', 'approveContent'],
          },
        },
      },
      {
        displayName: 'Description',
        name: 'description',
        type: 'string',
        default: '',
        displayOptions: {
          show: {
            resource: ['release'],
            operation: ['createWithContent', 'createWritten'],
          },
        },
      },
      {
        displayName: 'Body (HTML)',
        name: 'body',
        type: 'string',
        typeOptions: { rows: 10 },
        default: '',
        displayOptions: {
          show: {
            resource: ['release'],
            operation: ['createWithContent', 'reviseContent'],
          },
        },
      },
      {
        displayName: 'Distribution',
        name: 'distribution',
        type: 'options',
        options: [
          { name: 'standard', value: 'standard' },
          { name: 'custom', value: 'custom' },
        ],
        default: 'standard',
        displayOptions: {
          show: {
            resource: ['release'],
            operation: ['createWithContent', 'createWritten'],
          },
        },
      },
      {
        displayName: 'Schedule Distribution',
        name: 'scheduleDistribution',
        type: 'boolean',
        default: false,
        displayOptions: {
          show: {
            resource: ['release'],
            operation: ['createWithContent', 'createWritten'],
          },
        },
      },
      {
        displayName: 'Distribute At (ISO)',
        name: 'distributeAt',
        type: 'dateTime',
        default: '',
        displayOptions: {
          show: {
            resource: ['release'],
            operation: ['createWritten'],
          },
        },
      },
      {
        displayName: 'Main Keyword',
        name: 'mainKeyword',
        type: 'string',
        default: '',
        displayOptions: {
          show: {
            resource: ['release'],
            operation: ['createWritten'],
          },
        },
      },
      {
        displayName: 'URL',
        name: 'url',
        type: 'string',
        default: '',
        displayOptions: {
          show: {
            resource: ['release'],
            operation: ['createWritten'],
          },
        },
      },
      {
        displayName: 'Keyword (anchor text)',
        name: 'keyword',
        type: 'string',
        default: '',
        displayOptions: {
          show: {
            resource: ['release'],
            operation: ['createWritten'],
          },
        },
      },
      {
        displayName: 'Notes (writing instructions)',
        name: 'notes',
        type: 'string',
        typeOptions: { rows: 6 },
        default: '',
        displayOptions: {
          show: {
            resource: ['release'],
            operation: ['createWritten'],
          },
        },
      },
      {
        displayName: 'Rewrite Instructions',
        name: 'rewriteInstructions',
        type: 'string',
        default: '',
        displayOptions: {
          show: {
            resource: ['release'],
            operation: ['rejectContentToWriters'],
          },
        },
      },
    ],
  };
}
